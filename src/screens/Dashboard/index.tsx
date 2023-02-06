/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { StyleSheet } from 'react-native';
import Feed from './Feed';
import Search from './Search';
import Profile from './Profile';
import { colorPrimary } from '../../../assets/styles/GlobalTheme';
import Challenges from './Challenges';
import RecordStackScreen from './Records';

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
            } else if (route.name === 'Search') {
              return <Feather style={iconName = focused ? styles.iconFocused : styles.icon} name="search" />
            } else if (route.name === 'Record') {
              return <FontAwesome style={iconName = focused ? styles.iconFocused : styles.icon} name="bullseye" />
            } else if (route.name === 'Challenges') {
              return <Fontisto name="graphql" style={iconName = focused ? styles.iconFocused : styles.icon} color="#1f2937" />
            } else if (route.name === 'Profile') {
              return <Feather style={iconName = focused ? styles.iconFocused : styles.icon} name="user" />
            }
          },
          tabBarActiveTintColor: colorPrimary,
          tabBarInactiveTintColor: 'gray',
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
          name="Search"
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
          name="Challenges"
          component={Challenges}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
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
