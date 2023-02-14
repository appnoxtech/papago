/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import Feed from './Feed';
import Search from './Friends';
import Menu from './Menu';
import { colorPrimary } from '../../../assets/styles/GlobalTheme';
import Events from './Events';
import RecordStackScreen from './Records';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Tab = createBottomTabNavigator();


const Dashboard: React.FC<any> = () => {

  return (
    <>
      <Tab.Navigator
        //@ts-ignore
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              return <Ionicons style={iconName = focused ? styles.iconFocused : styles.icon} name={iconName = focused ? 'ios-home' : 'ios-home-outline'} />
            } else if (route.name === 'Friends') {
              return <Ionicons style={iconName = focused ? styles.iconFocused : styles.icon} name={iconName = focused ? 'people-sharp' : 'people-outline'} />
            } else if (route.name === 'Record') {
              return <FontAwesome style={iconName = focused ? styles.iconFocused : styles.icon} name="bullseye" />
            } else if (route.name === 'Events') {
              return <MaterialIcons name="event" style={iconName = focused ? styles.iconFocused : styles.icon} color="#1f2937" />
            } else if (route.name === 'Menu') {
              return <Entypo style={iconName = focused ? styles.iconFocused : styles.icon} name="menu" />
            }
          },
          tabBarActiveTintColor: colorPrimary,
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: responsiveFontSize(1.5),
            fontWeight: 'bold',
            letterSpacing: 0.8
          },
        })}
        
      >
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Friends"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Record"
          component={RecordStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const BottomIcons = (props: any) => {
  return <Ionicon name={props.name} style={styles.icon} color="#1f2937" />;
};
export default Dashboard;

const styles = StyleSheet.create({
  iconFocused: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colorPrimary
  },
  icon: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
