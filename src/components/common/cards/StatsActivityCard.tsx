import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

interface props{
    title: string
}

const StatsActivityCard: FC<props> = ({title}) => {
  return (
    <View style={styles.container}>
       <View style={styles.badgeContainer}>
          <Image style={styles.image} source={require('../../../../assets/images/common/activityStats.png')} />
       </View>
       <Text style={styles.textPrimary}>{title}</Text>
    </View>
  )
}

export default StatsActivityCard

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.5,
        borderColor: 'rgba(187, 187, 187, 0.5)',
        borderRadius: 10,
        paddingVertical: responsiveScreenHeight(3),
        paddingHorizontal: responsiveScreenWidth(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeContainer: {
        width: responsiveScreenWidth(30),
        height: responsiveScreenHeight(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveScreenHeight(1)
    },
    image: {
        resizeMode: 'cover',
    },
    textPrimary: {
        fontSize: responsiveFontSize(1.8),
        color: 'black',
        letterSpacing: 0.7,
        fontWeight: 'bold'
    }
})