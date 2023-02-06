import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackBtn from '../../components/common/buttons/BackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TextInputComponent from '../../components/common/inputs/TextInputComponent';
import {inputsHandlerParams} from '../../interfaces/components/inputs';
import BtnPrimary from '../../components/common/buttons/BtnPrimary';
import useNavigate from '../../hooks/navigation/navigationHook';
import {generateOTPService} from '../../services/common/OTPService';
import {useNavigation} from '@react-navigation/native';

const initialState = {
  email: '',
};
const ConfirmEmail = () => {
  const [input, setInputs] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();

  const handleChange = ({value, id}: inputsHandlerParams) => {
    setInputs(oldState => {
      return {
        ...oldState,
        [id]: value,
      };
    });
  };

  const validation = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let state: boolean;
    if (input.email === '') {
      state = false;
    } else if (!regex.test(input.email)) {
      state = false;
    } else {
      state = true;
    }
    setIsActive(state);
  };

  const handleClick = async () => {
    try {
      const data = {
        email: input.email,
        type: 'GENERATE',
      };
      await generateOTPService(data);
      setInputs(initialState);
      setIsActive(false);
      navigation.navigate(
        'OTP' as never,
        {email: input.email, type: 'VERIFY', flow: 'passwordForget'} as never,
      );
      return;
    } catch (error: any) {
      console.log('errro', error);
      Alert.alert(error.response.data.errors[0].message);
    }
  };

  useEffect(() => {
    validation();
  }, [input]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <BackBtn />
          <View>
            <Text style={styles.heading}>Reset password</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.helpingText}>
          To reset your password we need your email address. We will send you an
          email with a link to choose a new password.
        </Text>
        <TextInputComponent
          value={input.email}
          handleChange={handleChange}
          label="Email Address"
          id="email"
          subText=""
        />
      </View>
      <View style={styles.btnContainer}>
        <BtnPrimary
          label="Send me an email"
          isActive={isActive}
          handlePress={handleClick}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.6),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  helpingText: {
    // fontFamily: 'NunitoSans-Regular',
    fontSize: responsiveFontSize(2.1),
    marginBottom: responsiveScreenHeight(2),
    opacity: 0.5,
    color: 'black',
  },
  body: {
    marginVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(2),
  },
  btnContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
    width: '100%',
    position: 'absolute',
    bottom: responsiveScreenHeight(2),
  },
});
