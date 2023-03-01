import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import StatsGraphContainer from './StatsGraphContainer'

interface props {
  duration: string
}
const StatGraphsContainer: FC<props> = ({duration}) => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <StatsGraphContainer
         iconFamiy='MaterialCommunityIcons'
         iconName='arrow-expand'
         label='Distance'
         alaisTimeFrame={duration}
         totalValue={0}
         totalScale={'m'}
         avgValue={0}
         avgScale={'m'}
      />
      <StatsGraphContainer
         iconFamiy='MaterialCommunityIcons'
         iconName='elevation-rise'
         label='Elevation'
         alaisTimeFrame={duration}
         totalValue={0}
         totalScale={'m'}
         avgValue={0}
         avgScale={'m'}
      />

     <StatsGraphContainer
         iconFamiy='MaterialCommunityIcons'
         iconName='reload'
         label='Active Time'
         alaisTimeFrame={duration}
         totalValue={0}
         totalScale={'h'}
         avgValue={0}
         avgScale={'h'}
      />

      <StatsGraphContainer
         iconFamiy='MaterialCommunityIcons'
         iconName='lightning-bolt-outline'
         label='Activities'
         alaisTimeFrame={duration}
         totalValue={1}
         totalScale={''}
         avgValue={0.3}
         avgScale={''}
      />
    </ScrollView>
  )
}

export default StatGraphsContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        
    }
})