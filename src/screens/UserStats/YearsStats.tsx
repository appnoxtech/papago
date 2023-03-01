import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DurationListViewComponent from '../../components/common/DurationListViewComponent'
import StatGraphsContainer from '../../components/userStats/StatGraphsContainer';

const YearsStats = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [yearList, setYearList] = useState([2023]);
  return (
    <View style={styles.container}>
       <DurationListViewComponent
        list={yearList}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <StatGraphsContainer duration="year" />
    </View>
  )
}

export default YearsStats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})