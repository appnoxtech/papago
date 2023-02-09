/*eslint no-bitwise: "error"*/
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {Styles} from '../../../../assets/styles/GlobalStyles';
import {useDispatch} from 'react-redux';
import {updateRecordStatus} from '../../../redux/reducers/record.reducer';

const RecordActionComponent = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [distance, setDistance] = useState();
  const [speed, setSpeed] = useState();

  React.useEffect(() => {
    //@ts-ignore
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTimer((time: number) => time + 1000);
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
    setIsActive(true);
    setIsPaused(false);
    dispatch(updateRecordStatus({key: 'isStart', value: true}));
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    dispatch(updateRecordStatus({key: 'isPaused', value: !isPaused}));
  };

  const handleReset = () => {
    setIsActive(false);
    setTimer(0);
    dispatch(updateRecordStatus({key: 'isEnd', value: true}));
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

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.distanceContainer}>
          <Text style={styles.primaryText}>0.0</Text>
          <Text style={styles.subText}>Km</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.primaryText}>{getMinutesDigit()}:</Text>
          <Text style={styles.primaryText}>{getSecondDigit()}</Text>
        </View>
        <View style={styles.speedContainer}>
          <Text style={styles.primaryText}>0.0</Text>
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
            <TouchableOpacity style={styles.btnContainer} onPress={handleReset}>
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
          <TouchableOpacity style={styles.btnContainer} onPress={startBtnPress}>
            <Text style={styles.btnText}>START</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RecordActionComponent;

const styles = StyleSheet.create({
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
    fontSize: Platform.OS === 'android' ? responsiveFontSize(1.8) : responsiveFontSize(1.6),
    textAlign: 'center',
    color: 'black',
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: 'white',
  },
});
