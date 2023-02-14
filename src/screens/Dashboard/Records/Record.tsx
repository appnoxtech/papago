import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../../components/Dashboard/common/Headers';
import MapViewComponent from '../../../components/Dashboard/Record/MapView';
import RecordActionComponent from '../../../components/Dashboard/Record/RecordActionComponent';
import AnimatedMarkers from '../../../components/Dashboard/Record/DynamicMap';
import {Button, Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { useDispatch } from 'react-redux';
import { updateRecordActivityValue } from '../../../redux/reducers/recordActivityReducer';
import { updateRecordStatus } from '../../../redux/reducers/record.reducer';
import { useNavigation } from '@react-navigation/native';

const Record = () => {
  const [isFinished, setIsFinished] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleReset = () => {
    dispatch(updateRecordActivityValue({key: 'isActive', value: false}));
    dispatch(updateRecordStatus({key: 'isEnd', value: true}));
  };
  const handleFinishActivityBtnClick = () => {
    handleReset();
    navigation.reset({
      index: 0,
      routes: [{name: 'RecordPreview' as never}]
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Headers title="Record" />
      <View style={styles.mainContainer}>
        <MapViewComponent />
        <View style={styles.actionContainer}>
          <RecordActionComponent setIsFinished={setIsFinished} />
        </View>
      </View>
      {isFinished ? (
        <View style={styles.isFinishContainer}>
          <View style={{height: responsiveScreenHeight(69)}}></View>
          <View style={styles.isFinishContainerBody}>
            <Text style={styles.isFinishedPrimarytext}>Already finished ?</Text>
            <Text style={styles.isFinishedSubText}>
              Are you sure you want to finish this Activity ?
            </Text>
            <Button
              mode="contained"
              buttonColor={'#34b8ed'}
              style={styles.btn}
              onPress={handleFinishActivityBtnClick}>
              <Text style={styles.btnText}>Finish Activity</Text>
            </Button>
            <Button
              mode="contained"
              buttonColor="white"
              style={styles.cancelBtn}
              onPress={() => setIsFinished(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Button>
          </View>
        </View>
      ) : null}
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
  isFinishContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 500,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  isFinishedPrimarytext: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    fontWeight: 'bold',
  },
  isFinishedSubText: {
    fontSize: responsiveFontSize(1.6),
    color: 'black',
    opacity: 0.5,
    fontWeight: '600',
  },
  isFinishContainerBody: {
    height: responsiveScreenHeight(25),
    backgroundColor: 'white',
    paddingVertical: responsiveScreenHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginVertical: responsiveScreenHeight(1),
    width: responsiveScreenWidth(80),
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(1.7),
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  cancelBtn: {
    width: responsiveScreenWidth(80),
  },
  cancelBtnText: {
    color: '#bbbbbb',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
});
