import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colorPrimary } from '../../../../assets/styles/GlobalTheme';
import TextInputWithIcon from '../../common/inputs/TextInputWithIcon';
import LoadIcon from '../../common/LoadIcon';
import ViewActivityHorizontalList from './ViewActivityHorizontalList';
import { useNavigation } from '@react-navigation/native';

const PlanTripActionContainer = () => {
  const Navigation = useNavigation();
  const handleBackPress = () => {
    Navigation.goBack();
  }
  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
           <TouchableOpacity onPress={handleBackPress} style={styles.backBtnContainer}>
              <LoadIcon iconFamily='AntDesign' iconName='arrowleft' size={26} style={{}} color='black' />
           </TouchableOpacity>
           <View style={styles.actionContainer}>
               <View style={styles.textContainer}>
                  <TextInputWithIcon iconFamily={['FontAwesome', 'MaterialCommunityIcons']} iconName={['dot-circle-o', 'dots-vertical']} iconColor={[colorPrimary, 'black']} iconSize={[25, 25]} placeholder='Start location'  />
               </View>
               <View>
                  <TextInputWithIcon iconFamily={['Entypo', 'Ionicons']} iconName={['location', 'swap-vertical']} iconColor={['red', 'black']} iconSize={[25, 25]} placeholder='Drop location'  />
               </View>
           </View>
       </View>
       <ViewActivityHorizontalList />
    </View>
  )
}

export default PlanTripActionContainer

const styles = StyleSheet.create({
    container: {
       paddingTop: responsiveScreenHeight(1),
       paddingHorizontal: responsiveScreenWidth(2)
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    backBtnContainer: {
        width: responsiveScreenWidth(10),
        marginTop: responsiveScreenHeight(2)
    },
    actionContainer: {
        width: responsiveScreenWidth(90),
        marginLeft: responsiveScreenWidth(1.7),
    },
    textContainer: {
        marginVertical: responsiveScreenHeight(1)
    }
})