import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import RecordPreview from '../screens/common/RecordPreview';
import ViewActivity from '../screens/common/ViewActivity';
import {useNavigation} from '@react-navigation/native';
import EditActivity from '../screens/common/EditActivity';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecordPreview"
        component={RecordPreview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewActivity"
        component={ViewActivity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditActivity"
        component={EditActivity}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
