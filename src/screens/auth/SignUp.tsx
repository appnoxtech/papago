import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Platform,
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
import {useDispatch, useSelector} from 'react-redux';
import {UpdateAuthDetails} from '../../redux/reducers/auth';

const initialState = {
  email: '',
  password: '',
};

const subTextInitialState = {
  email: '',
  password: '',
};

interface input {
  id: 'email' | 'password';
  value: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const {email, password} = useSelector((state: any) => state.authDetails);
  const [subTexts, setSubTexts] = useState(subTextInitialState);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();

  const handleChange = ({value, id}: input) => {
    dispatch(UpdateAuthDetails({key: id, value}));
    validation();
  };

  const validation = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let state: boolean;
    if (email === '') {
      state = false;
      setSubTexts({
        ...subTexts,
        email: 'Email is Required !',
      });
    } else if (!regex.test(email)) {
      state = false;
      setSubTexts({
        ...subTexts,
        email: 'Invalid Email !',
      });
    } else if (password === '') {
      state = false;
      setSubTexts({
        ...subTexts,
        email: '',
        password: 'Password is Required !',
      });
    } else if (password.length < 5) {
      state = false;
      setSubTexts({
        ...subTexts,
        password: 'Password must contain 5 character !',
      });
    } else {
      state = true;
      setSubTexts(subTextInitialState);
    }
    setIsActive(state);
  };

  const handleClick = () => {
    navigation.navigate('ConfirmUsername' as never);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={style.flex1}>
      <SafeAreaView style={style.flex1}>
        <ScrollView style={style.mainConatiner}>
          <View>
            <View style={style.imgContainer}>
              <Image
                source={require('../../../assets/images/SignUpPage.png')}
                style={style.image}
                resizeMode="cover"
              />
              <View style={style.backBtnContainer}>
                <BackBtn />
              </View>
            </View>
            <View style={style.container}>
              <View style={style.primaryTextContainer}>
                <Text style={style.primaryText}>Let's get started !</Text>
              </View>
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
                  label="Email"
                  id="email"
                  value={email}
                  handleChange={handleChange}
                  subText={subTexts.email}
                />
                <TextInputComponent
                  label="Password"
                  id="password"
                  value={password}
                  handleChange={handleChange}
                  subText={subTexts.password}
                />
                <TermsCondition />
                <View style={{marginTop: responsiveScreenHeight(2)}}>
                  <BtnPrimary
                    label="Next"
                    isActive={isActive}
                    handlePress={handleClick}
                  />
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
    position: 'relative',
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(25),
    marginBottom: responsiveScreenHeight(0.3),
  },
  flex1: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {height: '100%', width: '100%'},
  btn: {
    marginVertical: responsiveScreenHeight(3),
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(95),
  },
  container: {},
  mainConatiner: {paddingHorizontal: responsiveScreenWidth(2.5)},
  primaryTextContainer: {
    paddingHorizontal: responsiveScreenWidth(1),
  },
  primaryText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(4),
  },
  mt_2: {
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
    paddingVertical: responsiveScreenHeight(1),
  },
  backBtnContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
