import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import RecordPreview from '../screens/common/RecordPreview';
import ViewActivity from '../screens/common/ViewActivity';
import EditActivity from '../screens/common/EditActivity';
import SelectActivityType from '../screens/common/SelectActivity';
import SharePreviewScreen from '../screens/common/SharePreviewScreen';
import ViewActivityGraph from '../screens/common/ViewActivityGraph';
import ViewUserStats from '../screens/common/ViewUserStats';
import Error from '../screens/common/Error';
import SearchLocationPage from '../screens/common/SearchLocationPage';
import PlanTrip from '../screens/Dashboard/Events/PlanTrip';
import EventDetails from '../screens/Dashboard/Events/EventDetails';
import EventSetting from '../screens/Dashboard/Events/EventSetting';
import InviteFriends from '../screens/common/InviteFriends';

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
      <Stack.Screen
        name="SelectActivity"
        component={SelectActivityType}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SharePreviewScreen"
        component={SharePreviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewActivityGraph"
        component={ViewActivityGraph}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewUserStats"
        component={ViewUserStats}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Error"
        component={Error}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchLocationPage"
        component={SearchLocationPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
       name="PlanTrip"
       component={PlanTrip}
       options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{headerShown: false}}
     />
      <Stack.Screen
       name="EventSetting"
       component={EventSetting}
       options={{headerShown: false}}
      />
      <Stack.Screen
       name="InviteFriend"
       component={InviteFriends}
       options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
