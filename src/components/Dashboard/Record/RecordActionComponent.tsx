/*eslint no-bitwise: "error"*/
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {Styles} from '../../../../assets/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {updateRecordStatus} from '../../../redux/reducers/record.reducer';
import {
  updateRecordActivityTimer,
  updateRecordActivityValue,
} from '../../../redux/reducers/recordActivityReducer';
import Geolocation from '@react-native-community/geolocation';
import {Button} from 'react-native-paper';

interface props {
  setIsFinished: any
}

const RecordActionComponent: React.FC<props> = ({setIsFinished}) => {
  const dispatch = useDispatch();
  const [gpsAvailable, setGpsAvailable] = useState(false);

  const {timer, isPaused, isActive, distance, speed} = useSelector(
    (state: any) => state.recordActivity,
  );

  React.useEffect(() => {
    //@ts-ignore
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        dispatch(updateRecordActivityTimer());
        // setTimer((time: number) => time + 1000);
      }, 1000);
    } else {
      //@ts-ignore
      clearInterval(interval);
    }
    return () => {
      //@ts-ignore
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const startBtnPress = () => {
    dispatch(updateRecordActivityValue({key: 'isActive', value: true}));
    dispatch(updateRecordActivityValue({key: 'isPaused', value: false}));
    // setIsActive(true);
    // setIsPaused(false);
    dispatch(updateRecordStatus({key: 'isStart', value: true}));
  };

  const handlePauseResume = () => {
    dispatch(updateRecordActivityValue({key: 'isPaused', value: !isPaused}));
    // setIsPaused(!isPaused);
    dispatch(updateRecordStatus({key: 'isPaused', value: !isPaused}));
  };

  const handleIsFinishClick = () => {
    setIsFinished(true);
  }

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

  useEffect(() => {
    if (timer) {
      const speed = distance / (timer / 3600000);
      if (speed) {
        dispatch(updateRecordActivityValue({key: 'speed', value: speed}));
      }
    }
  }, [distance]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setGpsAvailable(true);
      },
      error => setGpsAvailable(false),
    );
  });

  const _openAppSetting = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  return (
    <View style={styles.container}>
      {gpsAvailable ? (
        <>
          <View style={styles.head}>
            <View style={styles.distanceContainer}>
              <Text style={styles.primaryText}>
                {distance ? distance.toFixed(2) : '0:0'}
              </Text>
              <Text style={styles.subText}>Km</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.primaryText}>{getMinutesDigit()}:</Text>
              <Text style={styles.primaryText}>{getSecondDigit()}</Text>
            </View>
            <View style={styles.speedContainer}>
              <Text style={styles.primaryText}>
                {speed ? speed.toFixed(2) : '0:0'}
              </Text>
              <Text style={styles.subText}>Km/hr</Text>
            </View>
          </View>
          <View style={styles.body}>
            {isActive && isPaused ? (
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  style={[
                    styles.btnContainer,
                    Styles.bgWhite,
                    {borderColor: '#D0D0D0', borderWidth: 0.8},
                  ]}
                  onPress={handlePauseResume}>
                  <Text style={styles.btnResume}>RESUME</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={handleIsFinishClick}>
                  <Text style={styles.btnText}>Finish</Text>
                </TouchableOpacity>
              </View>
            ) : isActive && !isPaused ? (
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={handlePauseResume}>
                <Text style={styles.btnText}>PAUSE</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={startBtnPress}>
                <Text style={styles.btnText}>START</Text>
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
            onPress={_openAppSetting}>
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
    alignItems: 'center',
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
  },
  subText: {
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    textAlign: 'center',
  },
  body: {
    marginVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(2),
    height: responsiveScreenHeight(19),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(9.4),
    backgroundColor: colorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  btnResume: {
    fontSize:
      Platform.OS === 'android'
        ? responsiveFontSize(1.8)
        : responsiveFontSize(1.6),
    textAlign: 'center',
    color: 'black',
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: 'white',
  },
});
