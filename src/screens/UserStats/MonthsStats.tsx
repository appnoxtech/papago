import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DurationListViewComponent from '../../components/common/DurationListViewComponent';
import StatGraphsContainer from '../../components/userStats/StatGraphsContainer';
import {getMonthStringList} from '../../utlis/common';

const MonthsStats = () => {
  const [activeIndex, setActiveIndex] = useState(new Date().getMonth());
  const [monthList, setMonthList] = useState(getMonthStringList());
  return (
    <View style={styles.container}>
      <DurationListViewComponent
        list={monthList}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <StatGraphsContainer duration="month" />
    </View>
  );
};

export default MonthsStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
