import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  AppState,
} from 'react-native';
import {getDistance} from 'geolib';
import MapView, {Marker, Polyline} from 'react-native-maps';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import startPointImage from '../../../../assets/images/Dashboard/Oval.png';
import finishPointImage from '../../../../assets/images/Dashboard/greenMarker.png';
import {AddActivityService} from '../../../services/Dashboard/record.service';
import {
  resetRecordStatus,
  updateRecordStatus,
} from '../../../redux/reducers/record.reducer';
import {
  resetRecordActivityValue,
  setImmediatePoints,
  updateActivityFinishedAt,
  updateActivityId,
  updateActivitySpeed,
  updateDistanceMeter,
  updateRecordActivityValue,
  updateSpeedMeter,
} from '../../../redux/reducers/recordActivityReducer';
import {
  updateCurrentLocation,
  updateDestinationCords,
  updateInitialCords,
  updateWayPoints,
} from '../../../redux/reducers/map.reducer';

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

const MapViewComponent = () => {
  const {crrLocation, initialCords, destination, wayPoints} = useSelector(
    (state: any) => state.mapData,
  );
  const {distance, speed, isActive} = useSelector(
    (state: any) => state.recordActivity,
  );
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const recordStatus = useSelector((state: any) => state.recordStatus);
  const {isStart, isPaused, isEnd} = recordStatus;
  let Points: Array<cords> = [];
  const [watchId, setWatchId] = useState<number>(0);

  useEffect(() => {
    let centroid: any;
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    // to prevent setting initial cords again
    if (wayPoints.length) {
      return;
    }
    Geolocation.getCurrentPosition(
      info => {
        centroid = info.coords;
        const lat = parseFloat(centroid.latitude);
        const lng = parseFloat(centroid.longitude);
        const northeastLat = parseFloat(boundingBox.northEast.latitude);
        const southwestLat = parseFloat(boundingBox.southWest.latitude);
        const latDelta = northeastLat - southwestLat;
        const lngDelta = latDelta * ASPECT_RATIO;
        dispatch(
          updateCurrentLocation({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0041,
            longitudeDelta: 0.0021,
          }),
        );
      },
      error => console.log(error),
    );
  }, []);

  const setNewWayPointsCord = (points: cords) => {
    //set stored point if app gets killed
    if (wayPoints.length && !Points.length) {
      return (Points = [...wayPoints]);
    }
    Points.push(points);
    dispatch(updateWayPoints([...Points]));
  };

  // once user clicks on the start recording btn
  useEffect(() => {
    if (isStart) {
      console.log('initial Cords', initialCords);
      setNewWayPointsCord(initialCords);
      watchLocation();
    }
  }, [isStart]);

  useEffect(() => {
    // stop watching the location when user clicks on the stop watch
    if (isStart && isPaused) {
      const date = new Date();
      console.log('stopped watching user location');
      Geolocation.clearWatch(0);
      Geolocation.clearWatch(1);
      Geolocation.clearWatch(2);
      Geolocation.clearWatch(3);
      dispatch(setImmediatePoints(wayPoints));
      dispatch(updateActivityFinishedAt(date.getTime()));
      dispatch(updateActivitySpeed(speed));
      dispatch(updateRecordActivityValue({key: 'speed', value: 0}));
    } else if (isStart && !isPaused) {
      console.log('started watching user location');
      Points = [...wayPoints];
      watchLocation();
    }
  }, [isPaused]);

  // calculate distace by using initial cords and new cords by watch location
  const calculateDistance = () => {
    const watchDistance = getDistance(Points[0], Points[Points.length - 1]);
    const distance = watchDistance / 1000;
    dispatch(updateDistanceMeter(distance));
    return distance;
  };

  //watch and set the users device location
  const watchLocation = () => {
    const Id = Geolocation.watchPosition(
      ({coords}) => {
        const {latitude, longitude, speed} = coords;
        console.log('speed', speed);

        const cords = {latitude, longitude};
        dispatch(updateDestinationCords({...cords}));
        dispatch(
          updateRecordActivityValue({
            key: 'speed',
            value: speed ? speed * 3.6 : speed,
          }),
        );
        setNewWayPointsCord(cords);
        calculateDistance();
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

  const fitMapView = async () => {
    //@ts-ignore
    mapRef.current.animateToRegion({
      ...destination,
      latitudeDelta: 0.0009,
      longitudeDelta: 0.0021,
    });
  };

  useEffect(() => {
    fitMapView();
  }, [wayPoints]);
  

  return (
    <>
      {crrLocation ? (
        initialCords ? (
          <MapView
            ref={mapRef}
            initialRegion={{
              ...initialCords,
              latitudeDelta: 0.0041,
              longitudeDelta: 0.0021,
            }}
            showsBuildings={false}
            style={StyleSheet.absoluteFill}
            onMapReady={() => fitMapView()}>
            {/*  Show Marker for the initial starting point */}
            {initialCords ? (
              <Marker image={startPointImage} coordinate={initialCords} />
            ) : null}

            {/* Show Marker for the final end point  */}
            {destination ? (
              <Marker image={finishPointImage} coordinate={destination} />
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
            ref={mapRef}
            showsBuildings={false}
            style={styles.map}
            region={crrLocation}
            showsUserLocation={true}
            followsUserLocation={true}></MapView>
        )
      ) : (
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
    </>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

// if (Platform.OS === 'android') {
//   return (
//     <>
//       {crrLocation ? (
//         initialCords ? (
//           <MapView ref={(ref) => {mapRef = ref}} showsBuildings={false} style={StyleSheet.absoluteFill}>
//             {/*  Show Marker for the initial starting point */}
//             {initialCords ? (
//               <Marker image={startPointImage} coordinate={initialCords} />
//             ) : null}

//             {/* Show Marker for the final end point  */}
//             {destination ? (
//               <Marker
//                 image={finishPointImage}
//                 coordinate={destination}
//               />
//             ) : null}
//             {wayPoints.length > 0 ? (
//               <Polyline
//                 strokeWidth={3}
//                 strokeColor={colorPrimary}
//                 coordinates={wayPoints}
//               />
//             ) : null}

//           </MapView>
//         ) : (
//           <MapView
//             ref={(ref) => {
//               if(ref){
//                 Object.keys(ref).map(keyName => console.log(keyName))
//               }
//             }}
//             showsBuildings={false}
//             style={styles.map}
//             provider="google"
//             region={crrLocation}
//             showsUserLocation={true}
//           >
//           </MapView>
//         )
//       ) : (
//         <MapView
//           style={StyleSheet.absoluteFill}
//           initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         />
//       )}
//     </>
//   );
// } else {
//   return (
//     <>
//       {crrLocation ? (
//         initialCords ? (
//           <MapView showsBuildings={false} style={StyleSheet.absoluteFill}>
//             {/*  Show Marker for the initial starting point */}
//             {initialCords ? (
//               <Marker image={startPointImage} coordinate={initialCords} />
//             ) : null}

//             {/* Show Marker for the final end point  */}
//             {destination ? (
//               <Marker
//                 image={finishPointImage}
//                 coordinate={destination}
//               />
//             ) : null}
//             {wayPoints.length > 0 ? (
//               <Polyline
//                 strokeWidth={3}
//                 strokeColor={colorPrimary}
//                 coordinates={wayPoints}
//               />
//             ) : null}

//           </MapView>
//         ) : (
//           <MapView
//             showsBuildings={false}
//             style={StyleSheet.absoluteFill}
//             initialRegion={crrLocation}
//             showsUserLocation={true}
//           >
//             {/* <Marker coordinate={crrLocation} /> */}
//           </MapView>
//         )
//       ) : (
//         <MapView
//           style={StyleSheet.absoluteFill}
//           initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         />
//       )}
//     </>
//   );
// }
