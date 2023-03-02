import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';
import {
  getCalenderSelectedDaysFormat,
  getMonthName,
  getWeekDatesArray,
  timestampToLocaleDateConverterFunction,
} from '../../utlis/common';
interface week {
  start: {
    day: string;
    month: string;
  };
  end: {
    day: string;
    month: string;
  };
}
const StatsWeekCalenderComponent = () => {
  const [week, setWeek] = useState<week | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectWeekList, setSelectedWeekList] = useState(
    getWeekDatesArray(new Date().getTime()),
  );
  const maxDate = timestampToLocaleDateConverterFunction(
    new Date().getTime(),
    'yyyy-mm-dd',
  );

  useEffect(() => {
    setFirstAndLastDateOfWeek(selectWeekList);
  }, []);

  const setFirstAndLastDateOfWeek = (list: Array<string>) => {
    const firstDayOfWeek = list[0].split('-');
    const lastDayOfWeek = list[list.length - 1].split('-');

    setWeek({
      start: {
        day: firstDayOfWeek[2],
        month: getMonthName(parseInt(firstDayOfWeek[1], 10)),
      },
      end: {
        day: lastDayOfWeek[2],
        month: getMonthName(parseInt(lastDayOfWeek[1], 10)),
      },
    });
  };

  const handleDayClick = (timeStamp: number) => {
    const list = getWeekDatesArray(timeStamp);
    setFirstAndLastDateOfWeek(list);
    setSelectedWeekList(list);
  };

  const handleBtnPress = () => {
    if(!showCalendar){
      setShowCalendar(true);
    }else{
      handleDayClick(new Date().getTime());
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text
          style={
            styles.textPrimary
          }>{`${week?.start.month} ${week?.start.day} - ${week?.end.month} ${week?.end.day}`}</Text>
        <Button
          onPress={handleBtnPress}
          style={styles.btn}
          mode="outlined">
          <Text style={styles.btnText}>{showCalendar ? 'Show current Week' : 'Choose Week'}</Text>
        </Button>
      </View>
      {showCalendar ? (
        <>
          <Calendar
            initialDate={selectWeekList[0]}
            markedDates={getCalenderSelectedDaysFormat(selectWeekList)}
            onDayPress={day => handleDayClick(day.timestamp)}
            maxDate={maxDate}
          />
          <View style={styles.okBtnContainer}>
          <Button 
            style={styles.okBtn}
            buttonColor={colorPrimary}
            mode={'contained'}
            onPress={() => setShowCalendar(false)}
          >
             <Text style={styles.okBtnText}>Ok</Text>
          </Button>
          </View>
        </>
        
      ) : null}
    </>
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
    borderBottomColor: '#eeeeee',
  },
  textPrimary: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '500',
    color: 'black',
  },
  btn: {
    width: responsiveScreenWidth(50),
    borderColor: colorPrimary,
  },
  btnText: {
    fontSize: responsiveFontSize(1.8),
    color: colorPrimary,
    fontWeight: 'bold',
  },
  okBtn: {
    width: responsiveScreenWidth(40),
    paddingHorizontal: responsiveScreenHeight(0.2),
  },
  okBtnText: {
    color: 'white',
    fontSize: responsiveFontSize(2)
  },
  okBtnContainer: {
    flexDirection: 'row-reverse',
    paddingLeft: responsiveScreenWidth(3),
    paddingTop: responsiveScreenHeight(2),
  }
});
