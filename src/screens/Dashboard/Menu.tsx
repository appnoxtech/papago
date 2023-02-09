import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../components/Dashboard/common/Headers';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';

const Menu = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers title="Menu" />
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {},
});
