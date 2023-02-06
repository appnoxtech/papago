import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TermsAndConditions from '../services/common/TermsAndConditions';
import OTP from '../screens/common/OTPScreen';

const Stack = createNativeStackNavigator();

const CommonRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Terms"
        component={TermsAndConditions}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default CommonRoutes;
