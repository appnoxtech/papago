//@ts-nocheck
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  colorGrey,
  colorPrimary,
  colorSecondary,
  danger,
  mediumFont,
  systemGrey,
  systemGreyBg,
} from '../../../assets/styles/GlobalTheme';
import BackBtn from '../../components/common/buttons/BackBtn';
import BtnPrimary from '../../components/common/buttons/BtnPrimary';
import {useNavigation} from '@react-navigation/native';
import {confirmOTPService} from '../../services/common/OTPService';
import {Alert} from 'react-native';

const initialState = {
  pin1: '',
  pin2: '',
  pin3: '',
  pin4: '',
};

interface params {
  val: string;
  key: string;
}

interface params {
  params: {
    email: string;
    type: string;
    flow: string;
  };
}

const OTP: React.FC<params> = ({route}) => {
  const {email, type, flow} = route.params;
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const [show, setShow] = useState(false);
  const [activePin, setActivePin] = useState('pin1');
  const [isActiveBtn, setIsActiveBtn] = useState(true);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState(initialState);
  const navigation = useNavigation();

  const pin1Ref = useRef<RefObject<TextInput>>();
  const pin2Ref = useRef<RefObject<TextInput>>();
  const pin3Ref = useRef<RefObject<TextInput>>();
  const pin4Ref = useRef<RefObject<TextInput>>();

  const verifyOTP = async (otp: string) => {
    try {
      const data = {
        email,
        otp: parseInt(otp, 10),
        type,
      };
      const res = await confirmOTPService(data);
      setOtp(initialState);
      console.log(res.data);
      if (flow === 'Signup') {
        Alert.alert('SuccessFully Sign up');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else if (flow === 'passwordForget') {
        navigation.navigate('ConfirmPassword' as never, {email, otp} as never);
      }
    } catch (error: any) {
      Alert.alert('Notification', error.response.data.errors[0].message);
    }
  };

  const handleOTPVerification = () => {
    // OTP VERIFICATION
    const userOTP = Object.keys(otp).reduce((sum, pin): string => {
      //@ts-ignore
      const localPin: string = otp[pin];
      return sum + localPin;
    }, '');
    verifyOTP(userOTP);
  };

  const handleChange = ({val, key}: params) => {
    setOtp(oldOtp => {
      return {
        ...oldOtp,
        [key]: val,
      };
    });
  };

  useEffect(() => {
    if (!pin1Ref.current) {
      return;
    }
    //@ts-ignore
    pin1Ref.current.focus();
  }, []);

  // active btn when user enter 4 digit otp
  useEffect(() => {
    setError(false);
    if (otp.pin1 && otp.pin2 && otp.pin3 && otp.pin4) {
      setIsActiveBtn(false);
    } else {
      setIsActiveBtn(true);
    }
  }, [otp]);

  const clickHandler = () => {
    setShow(false);
    setTimer(59);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer >= 1) {
        setTimer(timer - 1);
      }
      if (timer === 0) {
        setShow(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.backBtnContainer}>
        <BackBtn />
      </View>
      <View style={styles.body}>
        {
          <View style={styles.container}>
            <View>
              <Text style={styles.primaryText}>Let's get started !</Text>
              <Text style={styles.secondaryHeading}>
                Enter the verification code we just sent on your email address.
              </Text>
            </View>
            <View style={styles.inputsContainer}>
              <View
                style={
                  error
                    ? styles.errorTextInputView
                    : activePin === 'pin1'
                    ? styles.focusTextInputView
                    : styles.TextInputView
                }>
                <TextInput
                  keyboardType="number-pad"
                  ref={pin1Ref}
                  selectionColor={colorSecondary}
                  maxLength={1}
                  onFocus={() => setActivePin('pin1')}
                  value={otp.pin1}
                  onChangeText={val => {
                    handleChange({val, key: 'pin1'});
                    if (val) {
                      if (!pin2Ref.current) {
                        return;
                      }
                      //@ts-ignore
                      pin2Ref.current.focus();
                      setActivePin('pin2');
                    }
                  }}
                  style={styles.otpInput}
                />
              </View>
              <View
                style={
                  error
                    ? styles.errorTextInputView
                    : activePin === 'pin2'
                    ? styles.focusTextInputView
                    : styles.TextInputView
                }>
                <TextInput
                  keyboardType="number-pad"
                  //@ts-ignore
                  ref={pin2Ref}
                  selectionColor={colorSecondary}
                  onFocus={() => setActivePin('pin2')}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      if (!pin1Ref.current) {
                        return;
                      }
                      //@ts-ignore
                      pin1Ref.current.focus();
                      setActivePin('pin1');
                    }
                  }}
                  maxLength={1}
                  value={otp.pin2}
                  onChangeText={val => {
                    handleChange({val, key: 'pin2'});
                    if (val) {
                      if (!pin3Ref.current) {
                        return;
                      }
                      //@ts-ignore
                      pin3Ref.current.focus();
                      setActivePin('pin3');
                    }
                  }}
                  style={styles.otpInput}
                />
              </View>
              <View
                style={
                  error
                    ? styles.errorTextInputView
                    : activePin === 'pin3'
                    ? styles.focusTextInputView
                    : styles.TextInputView
                }>
                <TextInput
                  keyboardType="number-pad"
                  maxLength={1}
                  selectionColor={colorSecondary}
                  //@ts-ignore
                  ref={pin3Ref}
                  onFocus={() => setActivePin('pin3')}
                  value={otp.pin3}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      if (!pin2Ref.current) {
                        return;
                      }
                      //@ts-ignore
                      pin2Ref.current.focus();
                      setActivePin('pin2');
                    }
                  }}
                  onChangeText={val => {
                    handleChange({val, key: 'pin3'});
                    if (val) {
                      if (!pin4Ref.current) {
                        return;
                      }
                      //@ts-ignore
                      pin4Ref.current.focus();
                      setActivePin('pin4');
                    }
                  }}
                  style={styles.otpInput}
                />
              </View>
              <View
                style={
                  error
                    ? styles.errorTextInputView
                    : activePin === 'pin4'
                    ? styles.focusTextInputView
                    : styles.TextInputView
                }>
                <TextInput
                  keyboardType="number-pad"
                  //@ts-ignore
                  ref={pin4Ref}
                  selectionColor={colorSecondary}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      if (!pin3Ref.current) {
                        return;
                      }
                      //@ts-ignore
                      pin3Ref.current.focus();
                      setActivePin('pin3');
                    }
                  }}
                  value={otp.pin4}
                  onFocus={() => setActivePin('pin4')}
                  maxLength={1}
                  onChangeText={val => handleChange({val, key: 'pin4'})}
                  style={styles.otpInput}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <BtnPrimary
                label={'Verify'}
                isActive={!isActiveBtn}
                handlePress={handleOTPVerification}
              />
            </View>
          </View>
        }
        <View style={styles.resendOtp}>
          <Text style={styles.message}>{'Didn’t received code? '}</Text>
          {show ? (
            <Pressable onPress={clickHandler}>
              <Text style={styles.linkMessage}>{'Resend'}</Text>
            </Pressable>
          ) : (
            <Text style={styles.linkMessage}>
              {timer < 10 ? `00:0${timer}` : `00:${timer}`}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  primaryText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveScreenHeight(5),
  },
  secondaryHeading: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.8),
    color: colorGrey,
  },
  body: {
    marginTop: responsiveScreenHeight(3),
    paddingHorizontal: responsiveScreenWidth(4.5),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    height: responsiveScreenHeight(84),
    marginTop: responsiveScreenHeight(3),
    position: 'relative',
  },
  inputsContainer: {
    position: 'relative',
    marginTop: responsiveScreenHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: responsiveScreenHeight(3),
  },
  TextInputView: {
    borderWidth: 2,
    borderColor: systemGrey,
    backgroundColor: systemGreyBg,
    width: responsiveScreenWidth(20),
    borderRadius: responsiveScreenWidth(2),
    height: responsiveScreenHeight(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTextInputView: {
    borderWidth: 2,
    borderColor: danger,
    backgroundColor: systemGreyBg,
    width: responsiveScreenWidth(20),
    borderRadius: responsiveScreenWidth(2),
    height: responsiveScreenHeight(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusTextInputView: {
    borderWidth: 2,
    borderColor: colorSecondary,
    width: responsiveScreenWidth(20),
    borderRadius: responsiveScreenWidth(2),
    height: responsiveScreenHeight(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    fontFamily: mediumFont,
    fontSize: responsiveFontSize(2.5),
  },
  otpInputHiglight: {},
  resendOtp: {
    position: 'absolute',
    bottom: responsiveScreenHeight(3),
    left: responsiveScreenWidth(25),
    marginTop: responsiveScreenWidth(15),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {fontFamily: mediumFont, fontSize: responsiveFontSize(2)},
  linkMessage: {
    fontFamily: mediumFont,
    fontSize: responsiveFontSize(2),
    color: colorPrimary,
  },
  backBtnContainer: {
    width: responsiveScreenWidth(15),
    paddingHorizontal: responsiveScreenWidth(2)
  }
});
