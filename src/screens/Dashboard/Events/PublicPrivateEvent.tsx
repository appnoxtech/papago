import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {SafeAreaView} from 'react-native';
import TripsDetailsContainer from '../../../components/Dashboard/chalenges/TripDetailsContainer';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LoadIcon from '../../../components/common/LoadIcon';
import { colorPrimary } from '../../../../assets/styles/GlobalTheme';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePlanTripDetails } from '../../../redux/reducers/planTrip.reducer';

const PublicPrivateEvent = () => {
  const dispatch = useDispatch();
  const {isPrivate} = useSelector((state: any) => state.planTrip);

  const toggleIsPrivate = (value: boolean) => {
    dispatch(UpdatePlanTripDetails({key: 'isPrivate', value}))
  }
  
  return (
    <TripsDetailsContainer title={'Who can join?'}>
      {
        <View style={styles.container}>
          <TouchableOpacity onPress={() => toggleIsPrivate(true)} style={[styles.box, {borderColor: isPrivate ? colorPrimary : '#eeeeee'}]}>
            <View style={styles.leftSection}>
              <View style={[styles.iconContainer, {backgroundColor: 'yellow'}]}>
                <LoadIcon
                  iconFamily="MaterialCommunityIcons"
                  iconName="lock-outline"
                  color="black"
                  style={{}}
                  size={30}
                />
              </View>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.challengeTitle}>PRIVATE</Text>
              <View style={{marginTop: 5}}>
                <Text style={styles.challengActivityText}>
                  Only people who are directly invited will be able to to see
                  and join this event.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleIsPrivate(false)} style={[styles.box, {borderColor: isPrivate ? '#eeeeee' : colorPrimary}]}>
            <View style={styles.leftSection}>
              <View style={[styles.iconContainer, {backgroundColor: 'yellow'}]}>
                <LoadIcon
                  iconFamily="MaterialCommunityIcons"
                  iconName="lock-open-outline"
                  color="black"
                  style={{}}
                  size={30}
                />
              </View>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.challengeTitle}>PUBLIC</Text>
              <View style={{marginTop: 5}}>
                <Text style={styles.challengActivityText}>
                  All Papa Go users will be able to see and join this trip from the Event Page Section.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      }
    </TripsDetailsContainer>
  );
};

export default PublicPrivateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    borderWidth: 2,
    borderRadius: responsiveScreenWidth(3),
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(2),
    marginTop: responsiveScreenHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    width: '10%',
  },
  rightSection: {
    paddingHorizontal: responsiveScreenWidth(3),
    flex: 1,
  },
  iconContainer: {
    width: responsiveScreenWidth(7),
    height: responsiveScreenWidth(7),
    marginVertical: responsiveScreenHeight(0.5),
    borderRadius: responsiveScreenWidth(3.5),
    backgroundColor: '#03C04A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveScreenWidth(2),
  },
  challengeTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
  },
  challengActivityText: {
    fontSize: responsiveFontSize(1.9),
    color: 'black',
    opacity: 0.5,
  },
});
