import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { colorPrimary } from '../../assets/styles/GlobalTheme';
import AllTimeStats from '../screens/UserStats/AllTimeStats';
import MonthsStats from '../screens/UserStats/MonthsStats';
import WeekStats from '../screens/UserStats/WeekStats';
import YearsStats from '../screens/UserStats/YearsStats';

const StatsTab = createMaterialTopTabNavigator();

function StatsTopNavigation() {
  return (
    <StatsTab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colorPrimary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(2),
          fontWeight: 'bold',
          letterSpacing: 0.8,
        },
        tabBarIndicatorStyle: {backgroundColor: colorPrimary}
      })}>
      <StatsTab.Screen name="Week" component={WeekStats} />
      <StatsTab.Screen name="Month" component={MonthsStats} />
      <StatsTab.Screen name="Year" component={YearsStats} />
      {/* <StatsTab.Screen name="All time" component={AllTimeStats} /> */}
    </StatsTab.Navigator>
  );
}

export default StatsTopNavigation;
