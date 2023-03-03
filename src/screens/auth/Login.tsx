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

const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const [inputs, setInputs] = useState(initialState);
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
      const res = await LoginServices(inputs);
      const data = res.data.data;
      const userInfo = {
        accessToken: data.token,
        userName: data.userName,
        name: data.name,
      };
      handleUserLogin(userInfo);
      Alert.alert('Successfully Login !');
      setLoading(false);
      dispatch(updateUserData(true));
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
            <Text style={style.primaryText}>Welcome back!</Text>
            <Text style={style.primaryText}>Glad to see you, Again!</Text>

            <View style={style.mt_3}>
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

              <Text style={style.hintText}>Or sign In with email</Text>
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
    flex: 1
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
  primaryText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(4),
  },
  header: {
    height: responsiveScreenHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: responsiveScreenWidth(1),
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
    marginTop: responsiveScreenHeight(15),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navText: {
    color: colorPrimary,
    fontSize: responsiveFontSize(2.1),
    // fontFamily: 'NunitoSans-Regular',
  },
  forgetPasswordContainer: {
    marginTop: responsiveScreenHeight(0.3),
    width: responsiveScreenWidth(95),
    flexDirection: 'row-reverse',
  },
});
