import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../components/Dashboard/common/Headers';

const Friends = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers title="Friends" />
    </SafeAreaView>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {},
});
