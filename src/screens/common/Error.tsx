import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Button } from 'react-native-paper'
import { colorPrimary } from '../../../assets/styles/GlobalTheme'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { resetMapData } from '../../redux/reducers/map.reducer'
import { resetRecordStatus } from '../../redux/reducers/record.reducer'
import { resetRecordActivityValue } from '../../redux/reducers/recordActivityReducer'

const Error = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(resetMapData());
    dispatch(resetRecordStatus());
    dispatch(resetRecordActivityValue());
    Navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard' as never}],
      });
  }
  return (
    <View style={styles.container}>
       <View style={styles.body}>
         <View style={styles.textContainer}>
           <Text style={styles.textPrimary}>Something went wrong</Text>
         </View>
         <Text style={styles.textSecondary}>We couldn't upload your activity right now.Don't worry, your activity is still saved on your device. we'll try again for you later.</Text>
         <Button
         mode='contained'
         style={styles.btn}
         buttonColor={colorPrimary}
         onPress={handlePress}
         >
            <Text style={styles.btnText}>Okay</Text>
         </Button>
       </View>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: responsiveScreenWidth(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginVertical: responsiveScreenHeight(1),
    },
    textPrimary: {
        fontSize: responsiveFontSize(5),
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    btn: {
        width: responsiveScreenWidth(30),
        paddingVertical: responsiveScreenHeight(0.3),
        marginTop: responsiveScreenHeight(2)
    },
    body: {
        width: responsiveScreenWidth(90),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: responsiveFontSize(2),
        color: 'white'
    },
    textSecondary: {
        fontSize: responsiveFontSize(2),
        color: 'black',
        opacity: 0.7,
        textAlign: 'center'
    }
})