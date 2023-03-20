import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Events from './Events';
import PlanTrip from './PlanTrip';
import SelectActivityType from '../../common/SelectActivity';


const EventStack = createNativeStackNavigator();

export default function EventsStackScreen() {
  return (
    <EventStack.Navigator>
      <EventStack.Screen
        options={{
          headerShown: false,
        }}
        name="Event"
        component={Events}
      />
      {/* <EventStack.Screen
        options={{
          headerShown: false,
        }}
        name="PlanTrip"
        component={PlanTrip}
      /> */}
      <EventStack.Screen
        options={{
          headerShown: false,
        }}
        name="SelectActivity"
        component={SelectActivityType}
      />
    </EventStack.Navigator>
  );
}
