/*eslint no-bitwise: "error"*/
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid
} from 'react-native';
import SystemSetting from 'react-native-system-setting'
import React, {useCallback, useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import BackgroundTimer from 'react-native-background-timer';
import AndroidOpenSettings from 'react-native-android-open-settings'
import {colorPrimary, colorSecondary} from '../../../../assets/styles/GlobalTheme';
import {Styles} from '../../../../assets/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {updateRecordStatus} from '../../../redux/reducers/record.reducer';
import {
  updateActivityStartedAt,
  updateActvityImage,
  updateRecordActivityTimer,
  updateRecordActivityValue,
} from '../../../redux/reducers/recordActivityReducer';
import Geolocation from '@react-native-community/geolocation';
import {Button} from 'react-native-paper';
import {updateInitialCords} from '../../../redux/reducers/map.reducer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import { ImageUploadService } from '../../../services/common/ImageUploadService';
import useHandleError from '../../../hooks/common/handelError';
import useCameraAccess from '../../../hooks/nativeAccess/cameraAccess';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';

interface props {
  setIsFinished: any;
}

const RecordActionComponent: React.FC<props> = ({setIsFinished}) => {
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const dispatch = useDispatch();
  const requestCameraPermission = useCameraAccess();
  const {destination} = useSelector((state: any) => state.mapData);
  const [gpsAvailable, setGpsAvailable] = useState(true);
  const handleError = useHandleError();
  const {timer, isPaused, isActive, distance, speed} = useSelector(
    (state: any) => state.recordActivity,
  );

  React.useEffect(() => {
    //@ts-ignore
    let interval = null;

    if (isActive && isPaused === false) {
      BackgroundTimer.stopBackgroundTimer();
      BackgroundTimer.runBackgroundTimer(() => { 
        //code that will be called every 1 seconds 
        dispatch(updateRecordActivityTimer());
      }, 1000);
    } else {
      //@ts-ignore
      BackgroundTimer.stopBackgroundTimer();
    }
    // return () => {
    //   //@ts-ignore
    //   BackgroundTimer.stopBackgroundTimer();
    // };
  }, [isActive, isPaused]);

  const startBtnPress = (accuracy: boolean) => {
    const data = new Date();
    Geolocation.getCurrentPosition(
      info => {
        const {coords} = info;
        const {latitude, longitude} = coords;
        console.log('latitude', latitude);
        dispatch(updateInitialCords({latitude, longitude}));
        dispatch(updateRecordActivityValue({key: 'isActive', value: true}));
        dispatch(updateRecordActivityValue({key: 'isPaused', value: false}));
        dispatch(updateRecordStatus({key: 'isStart', value: true}));
        dispatch(updateActivityStartedAt(data.getTime()));
        PushNotification.localNotification({
          channelId: '123',
          id: '123',
          title: 'Papa Go',
          message: `${
            selectedActivity.activityName
          } - ${getMinutesDigit()}:${getSecondDigit()}`
        })
        // AddActivtyServiceHandler({latitude, longitude});
      },
      error => {
        if(error.code === 3) {
          WeakLocationPopup();
        }
      },
      {
        timeout: 1500,
        distanceFilter: 0,
        enableHighAccuracy: accuracy,
      }
    );
  };

  const handlePauseResume = () => {
    dispatch(updateRecordActivityValue({key: 'isPaused', value: !isPaused}));
    dispatch(updateRecordStatus({key: 'isPaused', value: !isPaused}));
  };

  const handleIsFinishClick = () => {
    setIsFinished(true);
  };

  const getSecondDigit = () => {
    let seconds = Math.floor((timer / 1000) % 60);
    if (seconds < 10) {
      return `0${seconds}`;
    } else {
      return seconds;
    }
  };

  const getMinutesDigit = () => {
    let minutes = Math.floor((timer / 60000) % 60);
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  };

  const _openAppSetting = useCallback(async () => {
    Platform.OS === 'ios'
    ? Linking.openURL('App-Prefs:Location')
    : AndroidOpenSettings.locationSourceSettings();
  }, []);

  const handleCameraClick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      cameraType: 'back',
    }
    //@ts-ignore
    const response = await launchCamera(options);
    if(response.assets){
      const image = response.assets[0];
      const data = new FormData();
      data.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName
      });
      await handleImageUpdload(data);
      // dispatch(update)

    }else if(response.errorMessage) {
      Alert.alert('Message', response.errorMessage);
    }
  };

  const handleImageUpdload = async (image: any) => {
    try {
      const res = await ImageUploadService(image);
      console.log('res', res.data);
      const {data} = res.data;
      const imageUrl = data.baseUrl + data.imagePath;
      Geolocation.getCurrentPosition(
        info => {
          const {coords} = info;
          const {latitude, longitude} = coords;
          console.log('latitude', latitude);
          const imageData = {
            image: imageUrl,
            timestamp: new Date().getTime(),
            coordinate: {latitude, longitude},
          }
          console.log('Activty Image', imageData);
          dispatch(updateActvityImage(imageData));
        },
        error => console.log('Error', error),
      );
    } catch (error) {
      handleError(error)
    }
  }

  const cameraPressHandler = () => {
    requestCameraPermission(handleCameraClick);
  }
  

  //adding listner for gps location
  useEffect(() => {
    SystemSetting.addLocationListener(locationEnabled => setGpsAvailable(locationEnabled));
  }, []);

  //stop activity if gps off
  useEffect(() => {
    if(isActive && isPaused === false && !gpsAvailable){
      dispatch(updateRecordActivityValue({key: 'isPaused', value: !isPaused}));
      dispatch(updateRecordStatus({key: 'isPaused', value: !isPaused}));
    }
  }, [gpsAvailable]);

  const WeakLocationPopup = () => {
    Alert.alert('Notification', 'Unable to fetch location', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Retry', onPress: () => startBtnPress(false)},
    ])
  }
  

  return (
    <View style={styles.container}>
      {gpsAvailable ? (
        <>
          <View style={styles.head}>
            <View style={styles.distanceContainer}>
              <Text style={styles.primaryText}>
                {distance ? distance.toFixed(2) : '0.0'}
              </Text>
              <Text style={styles.subText}>Km</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.primaryText}>{getMinutesDigit()}:</Text>
              <Text style={styles.primaryText}>{getSecondDigit()}</Text>
            </View>
            <View style={styles.speedContainer}>
              <Text style={styles.primaryText}>
                {speed ? speed.toFixed(2) : '0.0'}
              </Text>
              <Text style={styles.subText}>Km/hr</Text>
            </View>
          </View>
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.cameraContainer}
              onPress={cameraPressHandler}>
              <Feather
                name="camera"
                size={28}
              />
            </TouchableOpacity>
            {isActive && isPaused ? (
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  style={[
                    styles.btnContainer,
                    Styles.bgWhite,
                    {borderColor: '#D0D0D0'},
                  ]}
                  onPress={handlePauseResume}>
                  <Text style={[styles.btnText, {color: 'black'}]}>RESUME</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnContainer, {borderColor: colorPrimary},]}
                  onPress={handleIsFinishClick}>
                  <Text style={[styles.btnText, {color: 'white'}]}>FINISH</Text>
                </TouchableOpacity>
              </View>
            ) : isActive && !isPaused ? (
              <TouchableOpacity
              style={[styles.btnContainer, {borderColor: colorPrimary},]}
                onPress={handlePauseResume}>
                <Text style={[styles.btnText, {color: 'white'}]}>PAUSE</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.btnContainer, {borderColor: colorPrimary},]}
                onPress={() => startBtnPress(true)}>
                <Text style={[styles.btnText, {color: 'white'}]}>START</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.modalContainer}>
          <Text style={styles.modalPrimaryText}>
            Enable GPS to have the best tracking result.
          </Text>
          <Text style={styles.modalSubText}>
            Enable GPS to have the best tracking result.
          </Text>
          <Button
            mode="contained"
            buttonColor={'#34b8ed'}
            style={styles.btn}
            onPress={_openAppSetting}
          >
            <Text style={styles.btnText}>Open Setting</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default RecordActionComponent;

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(5),
    
    alignItems: 'center',
  },
  modalPrimaryText: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSubText: {
    fontSize: responsiveFontSize(1.7),
    color: 'black',
    opacity: 0.5,
    marginVertical: responsiveScreenHeight(2),
    textAlign: 'center',
  },
  btn: {
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(40),
    marginBottom: responsiveScreenHeight(1),
  },
  container: {
    paddingVertical: responsiveScreenWidth(1),
  },
  colorBlack: {
    color: 'black',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    paddingTop: responsiveScreenHeight(2)
  },
  distanceContainer: {},
  timeContainer: {
    flexDirection: 'row',
  },
  speedContainer: {},
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: responsiveScreenWidth(50),
  },
  primaryText: {
    fontSize: responsiveFontSize(4),
    color: 'black',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
  },
  body: {
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(2),
    // height: Platform.OS === 'ios' ? responsiveScreenHeight(15) : responsiveScreenHeight(18),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  btnContainer: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenWidth(20),
    backgroundColor: colorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(10),
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth: 0.8,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  btnText: {
    fontSize:
      Platform.OS === 'android'
        ? responsiveFontSize(1.3)
        : responsiveFontSize(1.3),
    textAlign: 'center',
  },
  cameraContainer: {
    width: responsiveScreenWidth(13),
    height: responsiveScreenWidth(13),
    borderRadius: responsiveScreenWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#bbbbbb',
    backgroundColor: 'white',
    position: 'absolute',
    top: responsiveScreenHeight(3.3),
    left: responsiveScreenWidth(12),
  },
});
