import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../../components/Dashboard/common/Headers';
import MapViewComponent from '../../../components/Dashboard/Record/MapView';
import RecordActionComponent from '../../../components/Dashboard/Record/RecordActionComponent';
import AnimatedMarkers from '../../../components/Dashboard/Record/DynamicMap';

const Record = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers title="Record" />
      <View style={styles.mainContainer}>
        <MapViewComponent />
        {/* <AnimatedMarkers /> */}
        <View style={styles.actionContainer}>
          <RecordActionComponent />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Record;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    top: 0,
    right: 0,
    zIndex: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 10,
    right: 0,
    zIndex: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
