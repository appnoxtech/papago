import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../components/Dashboard/common/Headers';
import WelcomeSection from '../../components/Dashboard/feed/WelcomeSection';
import ViewPlannedActivity from '../../components/Dashboard/feed/ViewPlannedActivity';
import ViewSharedActivity from '../../components/Dashboard/feed/ViewSharedActivity';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import useGetActivityList from '../../hooks/getActivityList.hook';
import { getUserDataFromLocalStorage } from '../../utlis/auth';
import { GetActivityListService } from '../../services/Dashboard/record.service';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserActivityList, updateUserDetails } from '../../redux/reducers/user';
import useGetActivityFeedList from '../../hooks/Feed/GetFeedList.hook';

const Feed = () => {
  const dispatch = useDispatch();
  const {userDetails} = useSelector((state: any) => state.user);
  const getUserActivityFeedList = useGetActivityFeedList();
  
  useGetActivityList();
  const getUserDetails = async () => {
    const data = await getUserDataFromLocalStorage();
    dispatch(updateUserDetails({...data}));
  }
  useEffect(() => {
    getUserDetails();
    getUserActivityFeedList();
  }, []);



  return (
    <SafeAreaView edges={['top']} style={styles.container}>
     <Headers title="Feed" />
      <ScrollView
        style={styles.scollContainer}
        contentContainerStyle={styles.contentContainer}>
        <WelcomeSection />
        {
          userDetails ? <ViewPlannedActivity userDetails={userDetails} /> : null
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scollContainer: {
    height: '98%',
  },
  contentContainer: {
    paddingBottom: responsiveScreenHeight(6),
  },
});
