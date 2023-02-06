import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import TextInputComponent from '../../components/common/inputs/TextInputComponent';
import {inputsHandlerParams} from '../../interfaces/components/inputs';
import BackBtn from '../../components/common/buttons/BackBtn';
import SocialAuthBtn from '../../components/common/buttons/SocialAuthBtn';
import TermsCondition from '../../components/common/Terms&Condition';
import BtnPrimary from '../../components/common/buttons/BtnPrimary';
import {Styles} from '../../../assets/styles/GlobalStyles';
import {SignUpService} from '../../services/auth/AuthService';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

const initialState = {
  email: '',
  password: '',
};

const SignUp = () => {
  const [inputs, setInputs] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();

  const handleChange = ({value, id}: inputsHandlerParams) => {
    setInputs(oldState => {
      return {
        ...oldState,
        [id]: value,
      };
    });
    validation();
  };

  const validation = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let state: boolean;
    if (inputs.email === '') {
      state = false;
    } else if (!regex.test(inputs.email)) {
      state = false;
    } else if (inputs.password === '' || inputs.password.length < 5) {
      state = false;
    } else {
      state = true;
    }
    setIsActive(state);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      await SignUpService(inputs);
      setInputs(initialState);
      setIsActive(false);
      setLoading(false);
      navigation.navigate(
        'OTP' as never,
        {email: inputs.email, type: 'VERIFY', flow: 'Signup'} as never,
      );
    } catch (error: any) {
      Alert.alert('Notification', error.response.data.errors[0].message);
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={Styles.bgWhite}>
        <ScrollView>
          <View>
            <BackBtn />
          </View>
          <View>
            <View style={style.imgContainer}>
              <Image
                source={require('../../../assets/images/SignUpPage.png')}
                style={style.image}
                resizeMode="cover"
              />
            </View>
            <View style={style.container}>
              <Text style={style.primaryText}>Let's get started !</Text>
              <View style={[style.mt_2]}>
                <View style={style.socialBtnContainer}>
                  <SocialAuthBtn label="Google" type="google" />
                </View>
                <View style={style.socialBtnContainer}>
                  <SocialAuthBtn label="Facebook" type="facebook" />
                </View>
              </View>
              <Text style={style.hintText}>Or sign up with email</Text>
              <View>
                <TextInputComponent
                  label="Email address"
                  id="email"
                  value={inputs.email}
                  handleChange={handleChange}
                  subText=""
                />
                <TextInputComponent
                  label="Your Password"
                  id="password"
                  value={inputs.password}
                  handleChange={handleChange}
                  subText="Make sure your password is five or more characters long"
                />
                <TermsCondition />
                <View style={{marginTop: responsiveScreenHeight(0.5)}}>
                  {loading ? (
                    <Button
                      mode="contained"
                      buttonColor={'#34b8ed'}
                      style={style.btn}
                      loading={true}>
                      Loading
                    </Button>
                  ) : (
                    <BtnPrimary
                      label="Next"
                      isActive={isActive}
                      handlePress={handleClick}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const style = StyleSheet.create({
  imgContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(23),
    marginBottom: responsiveScreenHeight(0.3),
  },
  image: {height: '100%', width: '100%'},
  btn: {
    marginVertical: responsiveScreenHeight(3),
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(95),
  },
  container: {
    paddingHorizontal: responsiveScreenWidth(2.5),
  },
  primaryText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(4),
  },
  mt_2: {
    marginTop: responsiveScreenHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintText: {
    // fontFamily: 'NunitoSans-Regular',
    color: '#8391A1',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginVertical: responsiveScreenHeight(1.3),
  },
  socialBtnContainer: {
    width: '50%',
    paddingHorizontal: responsiveScreenWidth(1),
    paddingVertical: responsiveScreenHeight(1),
  },
});
