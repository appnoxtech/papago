import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, AnimatedRegion, Polyline} from 'react-native-maps';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {GOOGLE_MAP_APIKEY} from '@env';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import startPointImage from '../../../../assets/images/Dashboard/Oval.png';
import finishPointImage from '../../../../assets/images/Dashboard/greenMarker.png';
import {AddActivityService} from '../../../services/Dashboard/record.service';
import {
  resetRecordStatus,
  updateRecordStatus,
} from '../../../redux/reducers/record.reducer';

const options = {
  interval: 10,
  enableHighAccuracy: false,
  distanceFilter: 1,
};
interface cords {
  latitude: number;
  longitude: number;
}
const boundingBox = {
  southWest: {
    latitude: '24.2472',
    longitude: '89.920914',
  },
  northEast: {
    latitude: '24.259769',
    longitude: '89.934692',
  },
};

// let centroid = {
//   latitude: '24.2472',
//   longitude: '89.920914',
// };

const MapViewComponent = () => {
  const [crrLocation, setLocation]: any = useState();
  const markerRef = useRef<any>(null);
  let mapRef : any;
  const dispatch = useDispatch();
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const recordStatus = useSelector((state: any) => state.recordStatus);
  const {isStart, isPaused, isEnd} = recordStatus;
  const [initialCords, setInitialCords] = useState<cords | null>(null);
  const [finalCords, setFinalCords] = useState<cords | null>(null);
  const [destination, setDestination] = useState<cords | null>(null);
  const [wayPoints, setWayPoints] = useState<Array<cords>>([]);
  let Points: Array<cords> = [];
  const [watchId, setWatchId] = useState<number>(0);

  useEffect(() => {
    let centroid: any;
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      centroid = info.coords;
      const lat = parseFloat(centroid.latitude);
      const lng = parseFloat(centroid.longitude);
      const northeastLat = parseFloat(boundingBox.northEast.latitude);
      const southwestLat = parseFloat(boundingBox.southWest.latitude);
      const latDelta = northeastLat - southwestLat;
      const lngDelta = latDelta * ASPECT_RATIO;
      setLocation({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0041,
        longitudeDelta: 0.0021,
      });
    });
  }, []);

  const setNewWayPointsCord = (points: cords) => {
    Points.push(points);
    setWayPoints([...Points]);
  };

  // once user clicks on the start recording btn
  useEffect(() => {
    if (isStart) {
      Geolocation.getCurrentPosition(info => {
        const {coords} = info;
        const {latitude, longitude} = coords;
        setInitialCords({latitude, longitude});
        setNewWayPointsCord({latitude, longitude});
        watchLocation();
      });
    }
  }, [isStart]);

  useEffect(() => {
    // stop watching the location when user clicks on the stop watch
    if(isStart && isPaused){
      console.log('stopped watching user location')
      Geolocation.clearWatch(watchId);
    }else if(isStart && !isPaused){
      console.log('started watching user location');
      Points = [...wayPoints];
      watchLocation();
    }
  }, [isPaused])

  //watch and set the users device location
  const watchLocation = () => {
    const Id = Geolocation.watchPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        const cords = {latitude, longitude};
        setDestination({...cords});
        console.log('Updated Location :=>', cords);
        setNewWayPointsCord(cords);
      },
      error => {
        Alert.alert('Location Error', error.message);
        if (error.POSITION_UNAVAILABLE) {
          Alert.alert('Notification', 'Seems like GPS is OFF.');
        }
      },
      {
        interval: 10,
        enableHighAccuracy: true,
        distanceFilter: 1,
      },  
    );
    setWatchId(Id);
  };

  //once user finish the recording we will set the final cords state
  useEffect(() => {
    if (isEnd) {
      setTimeout(() => {
        console.log('Map is reset');
        console.log('called clear watch with watch id', watchId)
        Geolocation.clearWatch(watchId);
        setInitialCords(null);
        setDestination(null);
        setFinalCords(null);
        dispatch(resetRecordStatus());
        setWayPoints([]);
      }, 3000);
    }
  }, [isEnd]);

  console.log('Destinations', destination);
  console.log('wayPoints', wayPoints);
  console.log('isStart', isStart);
  console.log('isEnd', isEnd);
  console.log('mapRef', mapRef)

  if (Platform.OS === 'android') {
    return (
      <>
        {crrLocation ? (
          initialCords ? (
            <MapView ref={(ref) => {mapRef = ref}} showsBuildings={false} style={StyleSheet.absoluteFill}>
              {/*  Show Marker for the initial starting point */}
              {initialCords ? (
                <Marker image={startPointImage} coordinate={initialCords} />
              ) : null}

              {/* Show Marker for the final end point  */}
              {destination ? (
                <Marker
                  image={finishPointImage}
                  coordinate={destination}
                />
              ) : null}
              {wayPoints.length > 0 ? (
                <Polyline
                  strokeWidth={3}
                  strokeColor={colorPrimary}
                  coordinates={wayPoints}
                />
              ) : null}

              {/* Path will only show if recording is started and we have initial and dest. cords */}
              {/* {isStart && initialCords && finalCords ? (
                <MapViewDirections
                  origin={initialCords}
                  destination={finalCords}
                  apikey={GOOGLE_MAP_APIKEY}
                  strokeWidth={3}
                  strokeColor={colorPrimary}
                  waypoints={wayPoints}
                />
              ) : null} */}
            </MapView>
          ) : (
            <MapView
              ref={(ref) => {
                if(ref){
                  Object.keys(ref).map(keyName => console.log(keyName))
                }
              }}
              showsBuildings={false}
              style={styles.map}
              provider="google"
              region={crrLocation}
            > 
              <Marker coordinate={crrLocation} />
            </MapView>
          )
        ) : (
          <View>
            <Text>Loading ...</Text>
          </View>
        )}
      </>
    );
  } else {
    return (
      <>
        {crrLocation ? (
          initialCords ? (
            <MapView showsBuildings={false} style={StyleSheet.absoluteFill}>
              {/*  Show Marker for the initial starting point */}
              {initialCords ? (
                <Marker image={startPointImage} coordinate={initialCords} />
              ) : null}

              {/* Show Marker for the final end point  */}
              {destination ? (
                <Marker
                  image={finishPointImage}
                  coordinate={destination}
                />
              ) : null}
              {wayPoints.length > 0 ? (
                <Polyline
                  strokeWidth={3}
                  strokeColor={colorPrimary}
                  coordinates={wayPoints}
                />
              ) : null}

            </MapView>
          ) : (
            <MapView
              showsBuildings={false}
              style={StyleSheet.absoluteFill}
              initialRegion={crrLocation}
              showsUserLocation={true}
            >
              <Marker coordinate={crrLocation} />
            </MapView>
          )
        ) : (
          <View>
            <Text>Loading ...</Text>
          </View>
        )}
      </>
    );
  }
};

export default MapViewComponent;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
