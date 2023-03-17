import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
const mapStyle = [
  {
    featureType: 'poi.business',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
const PlanTrip = () => {
  const dispatch = useDispatch();
  const [showStopsContainer, setShowStopsContainer] = useState(false);
  const openStopsContainer = () => setShowStopsContainer(true);
  const closeStopsContainer = () => setShowStopsContainer(false);
  const {startingCords, selectedActivity, endingCords, stops} = useSelector(
    (state: any): PlanTripInterface => state.planTrip,
  );
  useEffect(() => {
    dispatch(ToggleEventTabVisibility('none'));
    return () => {
      dispatch(ToggleEventTabVisibility('flex'));
    };
  }, []);

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
        activityTypeId: selectedActivity ? selectedActivity._id : '',
        distance: 400,
      };
      const res = await AddEventService(data);
      Alert.alert('Notification', 'Event Created Successfully !');
      dispatch(ResetPlanTrip());
    } catch (error) {
      Alert.alert('Error', 'Error While updating Event');
    }
  };

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
       customMapStyle={mapStyle} style={styles.map}>
        {
          //@ts-ignore
          <Marker image={startPointImage} coordinate={startingCords.cords} />
        }
        {stops.map((stop, index: number) => {
          return (
            //@ts-ignore
            <Marker image={stopPointImage} coordinate={stop.cords} />
          );
        })}
        {
          //@ts-ignore
          <Marker image={finishPointImage} coordinate={endingCords.cords} />
        }
      </MapView>
      <ReactNativeModal style={{margin: 0}} isVisible={false}>
        <View style={{flex: 1}}></View>
        <View style={styles.modal}>
          <Button
            mode="contained"
            buttonColor={colorPrimary}
            style={styles.btn}
            onPress={handleActivityStart}>
            <Text style={styles.btnText}>Start</Text>
          </Button>
        </View>
      </ReactNativeModal>
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
    height: responsiveScreenHeight(20),
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(3),
    margin: 0,
    backgroundColor: 'white',
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {
    width: responsiveScreenWidth(30),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(5),
  },
});
