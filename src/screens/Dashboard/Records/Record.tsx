import {Platform, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
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
import NetInfo from "@react-native-community/netinfo";
import {useDispatch, useSelector} from 'react-redux';
import { updateRecordActivityValue } from '../../../redux/reducers/recordActivityReducer';
import { updateRecordStatus } from '../../../redux/reducers/record.reducer';
import { useNavigation } from '@react-navigation/native';
import useRecordActivityNotification from '../../../hooks/notifications/RecordNotifications';
import month from '../../../utlis/month';
import { updateLocalActivityList } from '../../../redux/reducers/user';
const date = new Date();

const Record = () => {
  useRecordActivityNotification();
  const [isFinished, setIsFinished] = useState(false);
  const dispatch = useDispatch();
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const navigation = useNavigation();
  const {keepScreenAwake, autoPause} = useSelector(
    (state: any) => state.recordStatus,
  );
  const recordStatus = useSelector((state: any) => state.recordStatus);
  const {isPaused, timer, activity, distance} = useSelector(
    (state: any) => state.recordActivity,
  );
  const {wayPoints} = useSelector((state: any) => state.mapData);
  const handleFinishActivityBtnClick = () => {
    NetInfo.fetch().then(state => { 
      console.log('state.isConnected', state.isConnected);
      if(state.isConnected) {
        navigation.reset({
          index: 0,
          routes: [{name: 'RecordPreview' as never}],
        });
      }else {
        const data = {
          finishedAt: activity.finishedAt,
          startedAt: activity.startedAt,
          activityName: `Morning ${month[date.getMonth()]} ${date.getDate()}th`,
          distance: distance,
          duration: timer,
          activityTypeId: selectedActivity._id,
          immediatePoints: [...activity.immediatePoints],
          speed: activity.speed,
          images: activity.images,
          isPublic: activity.isPublic
        };
        dispatch(updateLocalActivityList(data));
        navigation.reset({
          index: 0,
          routes: [{name: 'Error' as never}],
        });
      }
    });
    
  };


  // handle keepScreen Awake Toggle
  useEffect(() => {
    if (keepScreenAwake) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
  }, [keepScreenAwake]);

  const autoPauseActionHandler = (oldWayPointLength: any, locationChangeListener: any) => {
    const newWayPointLength = getLatestWayPoints();
    const isPaused = getPausedState();

    // if autoPause is on but activity is not started
    if(!recordStatus.isStart) {
      clearInterval(locationChangeListener);
      return;
    }

    // if autoPause is on but activity is paused
    if(isPaused) {
      clearInterval(locationChangeListener);
      return;
    }
    
    // activity will be pause if wayPoint array length not change in an 5 sec Interval
    if(oldWayPointLength === newWayPointLength) { 
      dispatch(updateRecordActivityValue({key: 'isPaused', value: true}));
      dispatch(updateRecordStatus({key: 'isPaused', value: true}));
      clearInterval(locationChangeListener);
    }else {
      oldWayPointLength = newWayPointLength;
    }
  }

  // handle autoPause toggle
  useEffect(() => {
    let locationChangeListener: any;
    let oldWayPointLength = 1;
    if (autoPause) {
      if(locationChangeListener) {
        clearInterval(locationChangeListener);
      }
      locationChangeListener = setInterval(() => {
        autoPauseActionHandler(oldWayPointLength, locationChangeListener)
       }, 5000);
    }else {
       if(locationChangeListener) {
         clearInterval(locationChangeListener);
       }
    }
  }, [autoPause, recordStatus.isStart, recordStatus.isPaused]);

  // console.log('oldWayPointLength', oldWayPointLength);

  const getLatestWayPoints = () => wayPoints.length;
  const getPausedState =  () => recordStatus.isStart && recordStatus.isPaused;



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
          <View style={{height: responsiveScreenHeight(63)}}></View>
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
    bottom: Platform.OS === 'android' ? responsiveScreenHeight(5) : responsiveScreenHeight(1),
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
