import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import BackBtn from '../../components/common/buttons/BackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TextInputComponent from '../../components/common/inputs/TextInputComponent';
import {inputsHandlerParams} from '../../interfaces/components/inputs';
import BtnPrimary from '../../components/common/buttons/BtnPrimary';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colorGrey, colorPrimary} from '../../../assets/styles/GlobalTheme';
import useNavigate from '../../hooks/navigation/navigationHook';
import {useDispatch} from 'react-redux';
import {updateUserData} from '../../redux/reducers/user';
import SocialLoginBtn from '../../components/common/buttons/SocialAuthBtn';
import {LoginServices} from '../../services/auth/AuthService';
import {Button} from 'react-native-paper';
import {useAuthHooks} from '../../hooks/authHooks';
import { useNavigation } from '@react-navigation/native';

const initialState = {
  email: '',
  password: '',
};

const subText = {
  email: '',
  password: '',
};
const Login = () => {
  const Navigation = useNavigation();
  const [inputs, setInputs] = useState(initialState);
  const [subTexts, setSubTexts] = useState(subText);
  const [isActive, setIsActive] = useState(false);
  const NavigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {handleUserLogin} = useAuthHooks();

  const handleChange = ({value, id}: inputsHandlerParams) => {
    setInputs(oldState => {
      return {
        ...oldState,
        [id]: value,
      };
    });
    validation(value, id);
  };

  const validation = (value: string, id: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let state: boolean;
    
    if (id === 'email' && value === '') {
      state = false;
      setSubTexts({
        ...subText,
        email: 'Required !',
      });
    } else if (id === 'email' && !regex.test(value)) {
      state = false;
      setSubTexts({
        ...subText,
        email: 'Invalid Email !',
      });
    } else if (id === 'password' && value === '') {
      state = false;
      setSubTexts({
        ...subText,
        email: '',
        password: 'Required !',
      });
    } else if (id === 'password' && value.length < 5) {
      state = false;
      setSubTexts({
        ...subText,
        password: 'Password length must be of 5 character long !',
      });
    } else {
      state = true;
      setSubTexts(subText);
    }
    setIsActive(state);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await LoginServices(inputs);
      const data = res.data.data;
      // redirect user to OTP page if the isEmailVerified is false
      if(data.isEmailVerified) {
        const userInfo = {
          accessToken: data.token,
          userName: data.userName,
          name: data.name,
        };
        handleUserLogin(userInfo);
        Alert.alert('Successfully Login !');
        setLoading(false);
        dispatch(updateUserData(true));
      }else {
        Navigation.navigate(
          'OTP' as never,
          {email: inputs.email, type: 'VERIFY', flow: 'Signup'} as never,
        );
        setLoading(false);
      }
      
    } catch (error: any) {
      Alert.alert(error.response.data.errors[0].message);
      setLoading(false);
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={style.safeContainer}>
        <View style={style.mainContainer}>
          <View style={style.header}>
            <BackBtn />
          </View>
          <View style={style.container}>
            <View style={style.textPrimaryContainer}>
              <Text style={style.primaryText}>Welcome back!</Text>
              <Text style={style.primaryText}>Glad to see you, Again!</Text>
            </View>
            <View style={style.mt_3}>
              <TextInputComponent
                label="Email address"
                id="email"
                value={inputs.email}
                handleChange={handleChange}
                subText={subTexts.email}
              />
              <TextInputComponent
                label="Your Password"
                id="password"
                value={inputs.password}
                handleChange={handleChange}
                subText={subTexts.password}
              />
              <View style={style.forgetPasswordContainer}>
                <Pressable onPress={() => NavigateTo('ConfirmEmail')}>
                  <Text style={style.forgetText}>Forgot password ?</Text>
                </Pressable>
              </View>
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
                    label="Login"
                    isActive={isActive}
                    handlePress={handleClick}
                  />
                )}
              </View>
              
              <Text style={style.hintText}>Or Sign in with</Text>
              <View style={[style.mt_2]}>
                <View style={style.socialBtnContainer}>
                  <SocialLoginBtn label="Google" type="google" />
                </View>
                <View style={style.socialBtnContainer}>
                  <SocialLoginBtn label="Facebook" type="facebook" />
                </View>
              </View>
              <View style={style.footerContainer}>
                <Text style={style.footerTextSuggestion}>
                  {"Don't have an account? "}
                </Text>
                <Pressable onPress={() => NavigateTo('Signup')}>
                  <Text style={style.navText}>Sign up</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const style = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: responsiveScreenWidth(2.5),
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  btn: {
    marginVertical: responsiveScreenHeight(3),
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(95),
  },
  textPrimaryContainer: {
     paddingHorizontal: responsiveScreenWidth(1)
  },
  primaryText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(4),
    color: 'black'
  },
  header: {
    height: responsiveScreenHeight(10),
    flexDirection: 'row',
  },
  forgetText: {
    // fontFamily: 'NunitoSans-Regular',
    color: colorPrimary,
    fontSize: responsiveFontSize(2.1),
  },
  hintText: {
    // fontFamily: 'NunitoSans-Regular',
    color: '#8391A1',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: responsiveScreenHeight(5),
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(3),
  },
  socialBtnContainer: {
    width: '50%',
    paddingVertical: responsiveScreenHeight(1),
  },
  mt_2: {
    marginTop: responsiveScreenHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  mt_3: {
    marginTop: responsiveScreenHeight(6),
  },
  footerTextSuggestion: {
    fontSize: responsiveFontSize(2.1),
    color: colorGrey,
    // fontFamily: 'NunitoSans-Regular',
  },
  footerContainer: {
    marginTop: responsiveScreenHeight(11),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navText: {
    color: colorPrimary,
    fontSize: responsiveFontSize(2.1),
    // fontFamily: 'NunitoSans-Regular',
  },
  forgetPasswordContainer: {
    width: responsiveScreenWidth(93.5),
    flexDirection: 'row-reverse',
  },
});
