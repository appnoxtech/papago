import {ScrollView, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../components/Dashboard/common/Headers';
import WelcomeSection from '../../components/Dashboard/feed/WelcomeSection';
import ViewPlannedActivity from '../../components/Dashboard/feed/ViewPlannedActivity';
import ViewSharedActivity from '../../components/Dashboard/feed/ViewSharedActivity';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import useGetActivityList from '../../hooks/getActivityList.hook';
import { getUserDataFromLocalStorage } from '../../utlis/auth';

const Feed = () => {
  const [userDetails, setUserDetails] = useState<any | null>(null);
  useGetActivityList();
  const getUserDetails = async () => {
    const data = await getUserDataFromLocalStorage();
    console.log('data', data);
    setUserDetails(data);
  }
  useEffect(() => {
    getUserDetails()
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
