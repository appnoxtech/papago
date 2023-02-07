import {ScrollView, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../components/Dashboard/common/Headers';
import WelcomeSection from '../../components/Dashboard/feed/WelcomeSection';
import ViewPlannedActivity from '../../components/Dashboard/feed/ViewPlannedActivity';
import ViewSharedActivity from '../../components/Dashboard/feed/ViewSharedActivity';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import useGetActivityList from '../../hooks/getActivityList.hook';

const Feed = () => {
  useGetActivityList();
  return (
    <SafeAreaView style={styles.container}>
      <Headers title="Feed" />
      <ScrollView
        style={styles.scollContainer}
        contentContainerStyle={styles.contentContainer}>
        <WelcomeSection />
        <ViewPlannedActivity />
        <ViewSharedActivity />
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
