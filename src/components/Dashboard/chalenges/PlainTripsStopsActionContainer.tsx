import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import LoadIcon from '../../common/LoadIcon';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TextInputWithIcon from '../../common/inputs/TextInputWithIcon';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {Button} from 'react-native-paper';
import RouteMapStops from './RouteMapStops';
import {useSelector} from 'react-redux';
import {PlanTripInterface} from '../../../interfaces/reducers/PlanTripInterface';

interface props {
    closeStopsContainer: any
}

const PlainTripsStopsActionContainer: FC<props> = ({closeStopsContainer}) => {
  const {startingCords, endingCords, distance} = useSelector(
        (state: any): PlanTripInterface => state.planTrip,
   );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
        <TouchableOpacity
          onPress={closeStopsContainer}
          style={styles.backBtnContainer}>
          <LoadIcon
            iconFamily="AntDesign"
            iconName="arrowleft"
            size={26}
            style={{}}
            color="black"
          />
        </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.stopsContainer}>
          <TextInputWithIcon
            iconSize={[25]}
            value={startingCords.name}
            isEditable={false}
            iconFamily={['FontAwesome']}
            iconName={['dot-circle-o']}
            iconColor={[colorPrimary]}
            placeholder="Your Location"
          />
          <RouteMapStops />
          <TextInputWithIcon
            iconSize={[25]}
            value={endingCords.name}
            isEditable={false}
            iconFamily={['Entypo']}
            iconName={['location']}
            iconColor={['red']}
            placeholder="Final Stop"
          />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftContainerText}>
           {` Total Distance: ${(distance / 1000).toFixed(2)} Km`} 
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Button onPress={closeStopsContainer} style={styles.btn}>
            <Text style={styles.btnText}>Done</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PlainTripsStopsActionContainer;

const styles = StyleSheet.create({
  container: {
    height: responsiveScreenHeight(28),
    borderBottomWidth: 1.5,
    borderBottomColor: '#eeeeee',
  },
  scrollContainer: {
    height: responsiveScreenHeight(20),
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(2),
    paddingBottom: responsiveScreenHeight(1),
  },
  backBtnContainer: {
    width: responsiveScreenWidth(10),
    marginTop: responsiveScreenHeight(2),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveScreenHeight(0.5),
    paddingHorizontal: responsiveScreenWidth(1),
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  btn: {
    width: responsiveScreenWidth(30),
    paddingVertical: responsiveScreenHeight(0.4),
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    color: colorPrimary,
  },
  rightContainer: {
    width: responsiveScreenWidth(35),
    flexDirection: 'row-reverse',
  },
  leftContainer: {
    width: responsiveScreenWidth(65),
    paddingLeft: responsiveScreenWidth(3),
  },
  leftContainerText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: 'black',
    opacity: 0.5,
  },
  stopsContainer: {
    paddingTop: responsiveScreenHeight(0.5),
    paddingLeft: responsiveScreenWidth(2),
  },
});
