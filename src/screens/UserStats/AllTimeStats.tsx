import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatGraphsContainer from '../../components/userStats/StatGraphsContainer'

const AllTimeStats = () => {
  return (
    <View style={styles.container}>
      <StatGraphsContainer duration='week' isHide={true} />
    </View>
  )
}

export default AllTimeStats

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  }
})