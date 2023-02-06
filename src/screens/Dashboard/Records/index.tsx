import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Record from './Record';
import Setting from './Setting';
import SelectActivityType from './SelectActivity';

const RecordStack = createNativeStackNavigator();

export default function RecordStackScreen() {
  return (
    <RecordStack.Navigator>
      <RecordStack.Screen
        options={{
          headerShown: false,
        }}
        name="RecordStack"
        component={Record}
      />
      <RecordStack.Screen
        options={{
          headerShown: false,
        }}
        name="Setting"
        component={Setting}
      />
      <RecordStack.Screen
        options={{
          headerShown: false,
        }}
        name="SelectActivity"
        component={SelectActivityType}
      />
    </RecordStack.Navigator>
  );
}
