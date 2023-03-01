import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { Button } from 'react-native-paper';
import { colorPrimary } from '../../../assets/styles/GlobalTheme';
interface week {
  start: {
    day: number;
    month: string;
  };
  end: {
    day: number;
    month: string;
  };
}
const StatsWeekCalenderComponent = () => {
  const [week, setWeek] = useState<week | null>(null);

  useEffect(() => {
    setWeek({
      start: {
        day: 27,
        month: 'Feb',
      },
      end: {
        day: 5,
        month: 'Mar',
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={
          styles.textPrimary
        }>{`${week?.start.month} ${week?.start.day} - ${week?.end.month} ${week?.end.day}`}</Text>
        <Button style={styles.btn} mode='outlined'>
            <Text style={styles.btnText}>Choose Week</Text>
        </Button>
    </View>
  );
};

export default StatsWeekCalenderComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: responsiveScreenHeight(1.4),
    paddingHorizontal: responsiveScreenWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.3,
    borderBottomColor: '#eeeeee'
  },
  textPrimary: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '500',
    color: 'black',
  },
  btn: {
    width: responsiveScreenWidth(50),
    borderColor: colorPrimary
  },
  btnText: {
    fontSize: responsiveFontSize(2.2),
    color: colorPrimary,
    fontWeight: 'bold'
  }
});
