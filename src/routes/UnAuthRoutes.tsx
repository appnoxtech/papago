import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import OnBoardingPage from '../screens/auth/OnBoardingPage';
import ConfirmEmail from '../screens/auth/ConfirmEmail';
import OTP from '../screens/common/OTPScreen';
import TermsAndConditions from '../services/common/TermsAndConditions';
import ConfirmPassword from '../screens/auth/ConfirmPassword';

const Stack = createNativeStackNavigator();

const UnAuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoardingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="OTP"
        //@ts-ignore
        component={OTP}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Terms"
        component={TermsAndConditions}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default UnAuthRoutes;
