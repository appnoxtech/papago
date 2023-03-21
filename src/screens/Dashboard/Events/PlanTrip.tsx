import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {GOOGLE_MAP_APIKEY} from '@env';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ReactNativeModal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  ResetPlanTrip,
  ToggleEventTabVisibility,
  UpdateTripDistance,
} from '../../../redux/reducers/planTrip.reducer';
import PlainTripsStopsActionContainer from '../../../components/Dashboard/chalenges/PlainTripsStopsActionContainer';
import PlanTripActionContainer from '../../../components/Dashboard/chalenges/PlanTripActionContainer';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {AddEventService} from '../../../services/Dashboard/events.service';
import {
  planTripCords,
  PlanTripInterface,
} from '../../../interfaces/reducers/PlanTripInterface';
import startPointImage from '../../../../assets/images/Dashboard/Oval.png';
import finishPointImage from '../../../../assets/images/Dashboard/greenMarker.png';
import stopPointImage from '../../../../assets/images/Dashboard/stop.png';
import MapViewDirections, {
  MapViewDirectionsOrigin,
  MapViewDirectionsWaypoints,
} from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/core';
import useGetEventListHook from '../../../hooks/Events/GetEventListHook';
const mapStyle = [
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
const PlanTrip = () => {
  const GetEventList = useGetEventListHook();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const [showStopsContainer, setShowStopsContainer] = useState(false);
  const openStopsContainer = () => setShowStopsContainer(true);
  const closeStopsContainer = () => setShowStopsContainer(false);
  const {startingCords, selectedActivity, endingCords, stops, distance} = useSelector(
    (state: any): PlanTripInterface => state.planTrip,
  );
  const [isVisible, setIsVisible] = useState(
    startingCords.cords && endingCords.cords
  );

  useEffect(() => {
    dispatch(ToggleEventTabVisibility('none'));
    return () => {
      dispatch(ToggleEventTabVisibility('flex'));
    };
  }, []);

  useEffect(() => {
    setIsVisible(
      startingCords.cords && endingCords.cords
    );
  }, [startingCords.cords, endingCords.cords]);

  const handleActivityStart = async () => {
    try {
      const data = {
        from: {
          ...startingCords.cords,
          name: startingCords.name,
        },
        to: {
          ...endingCords.cords,
          name: endingCords.name,
        },
        immediatePoints: stops.map((item: planTripCords) => {
          return {
            ...item.cords,
            name: item.name,
          };
        }),
        activityTypeId: selectedActivity ? selectedActivity : '',
        distance: distance,
        eventTitle: `Let's reach the goal`,
        eventDescription: `Let's reach the finish line together! We've got this!`
      };
      console.log('Data', data);
      
      const res = await AddEventService(data);
      Alert.alert('Notification', 'Event Created Successfully !');
      dispatch(ResetPlanTrip());
      GetEventList();
      Navigation.goBack();
    } catch (error: any) {
      console.log("errpr", error.response.data.errors[0]);
      
      Alert.alert('Error', 'Error While updating Event');
    }
  };
  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView
      edges={['top']}
      style={[StyleSheet.absoluteFill, styles.container]}>
      {showStopsContainer ? (
        <PlainTripsStopsActionContainer
          closeStopsContainer={closeStopsContainer}
        />
      ) : (
        <PlanTripActionContainer openStopsContainer={openStopsContainer} />
      )}
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 28.6448,
          longitude: 77.216721,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        customMapStyle={mapStyle}
        style={styles.map}>
        {
          <Marker
            image={startPointImage}
            coordinate={{
              latitude: startingCords.cords
                ? (startingCords.cords.latitude as number)
                : 0,
              longitude: startingCords.cords
                ? (startingCords.cords.longitude as number)
                : 0,
            }}
          />
        }
        {stops.map((stop, index: number) => {
          return (
            <React.Fragment key={index}>
              <Marker
                image={stopPointImage}
                coordinate={{
                  latitude: stop.cords ? (stop.cords.latitude as number) : 0,
                  longitude: stop.cords ? (stop.cords.longitude as number) : 0,
                }}
              />
            </React.Fragment>
          );
        })}
        {
          //@ts-ignore
          <Marker
            image={finishPointImage}
            coordinate={{
              latitude: endingCords.cords
                ? (endingCords.cords.latitude as number)
                : 0,
              longitude: endingCords.cords
                ? (endingCords.cords.longitude as number)
                : 0,
            }}
          />
        }

        <MapViewDirections
          origin={startingCords.cords as MapViewDirectionsOrigin}
          destination={endingCords.cords as MapViewDirectionsOrigin}
          apikey={GOOGLE_MAP_APIKEY}
          strokeWidth={3}
          strokeColor={colorPrimary}
          waypoints={
            stops.map(stop => {
              return {
                latitude: stop.cords?.latitude,
                longitude: stop.cords?.longitude,
              };
            }) as Array<MapViewDirectionsWaypoints>
          }
          onReady={(result) => {
            //converting Km into m.
            const distance = result.distance * 1000;
            dispatch(UpdateTripDistance(distance));
             mapRef?.current?.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
              }
            });
          }}
        />
      </MapView>
      {
         isVisible ? <View style={styles.modal}>
         <Button
           mode="contained"
           buttonColor={colorPrimary}
           style={styles.btn}
           onPress={handleActivityStart}>
           <Text style={styles.btnText}>Start</Text>
         </Button>
       </View>  : null
      }
    </SafeAreaView>
  );
};

export default PlanTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(2),
  },
  modal: {
    height: responsiveScreenHeight(15),
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(3),
    margin: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {
    width: responsiveScreenWidth(80),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(5),
  },
});
