import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../components/Dashboard/common/Headers';

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers title="Search" />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {},
});
