import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { systemGrey } from '../../../../assets/styles/GlobalTheme'

const ListFooterComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textPrimary}>That's it... for now!</Text>
      <Text style={styles.textSecondary}>The more people you follow, the more great stories you will see here.</Text>
    </View>
  )
}

export default ListFooterComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: systemGrey,
        paddingHorizontal: responsiveScreenWidth(3),
        paddingVertical: responsiveScreenHeight(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPrimary: {
        fontSize: responsiveFontSize(3.7),
        fontWeight: 'bold',
        color: 'black',
        lineHeight: responsiveScreenHeight(5)
    },
    textSecondary: {
        fontSize: responsiveFontSize(1.8),
        color: 'black',
        opacity: 0.5,
        textAlign: 'center'
    }
})