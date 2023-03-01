import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StatsWeekCalenderComponent from '../../components/userStats/StatsWeekCalenderComponent'
import StatGraphsContainer from '../../components/userStats/StatGraphsContainer'

const WeekStats = () => {
  return (
    <View style={styles.container}>
       <StatsWeekCalenderComponent />
       <StatGraphsContainer duration='week' />
    </View>
  )
}

export default WeekStats

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  }
})