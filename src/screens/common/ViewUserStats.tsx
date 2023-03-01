import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBackBtn from '../../components/common/Headers/HeaderWithBackBtn'
import StatsTopNavigation from '../../routes/StatsTopNavigation'

const ViewUserStats = () => {
  return (
    <SafeAreaView style={styles.container}>
        <HeaderWithBackBtn title='Stats' />
        <StatsTopNavigation />
    </SafeAreaView>
  )
}

export default ViewUserStats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})