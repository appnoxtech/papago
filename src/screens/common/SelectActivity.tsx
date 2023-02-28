import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import HeaderWithBackBtn from '../../components/common/Headers/HeaderWithBackBtn';
import {Text} from 'react-native-paper';
import ActivityTile from '../../components/Dashboard/Record/ActivityTile';
import {ActivityTypes} from '../../../assets/dummyData/ActivityType';
import {activity, data} from '../../interfaces/Dashboard/record.interface';
import {GetAllActivityService} from '../../services/Dashboard/activity.service';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';

const SelectActivityType = () => {
  const {activityList} = useSelector((state: any) => state.activity);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackBtn title="Select Activity Type" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentConatiner}>
        <>
          {activityList.length > 0
            ? activityList.map((Activity: activity) => (
                <View key={Activity.title} style={styles.activitySection}>
                  <Text style={styles.primaryText}>{Activity.title}</Text>
                  {Activity.data.map((dataItem: data) => (
                    <ActivityTile Activity={dataItem} key={dataItem._id} />
                  ))}
                </View>
              ))
            : null}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectActivityType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.6),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  contentConatiner: {
    paddingVertical: responsiveScreenHeight(1),
  },
  primaryText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold',
    letterSpacing: 0.7,
    color: 'black',
    marginStart: responsiveScreenWidth(4),
  },
  activitySection: {
    marginVertical: responsiveScreenHeight(2),
  },
});
