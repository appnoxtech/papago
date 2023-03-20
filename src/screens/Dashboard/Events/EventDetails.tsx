import { Image, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Headers from '../../../components/Dashboard/common/Headers'
import EventDetailsHeader from '../../../components/Dashboard/chalenges/EventDetailsHeader'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import LoadIcon from '../../../components/common/LoadIcon'
import { useSelector } from 'react-redux'

const EventDetails:FC<any> = ({route}) => {
  const {selectedEvent} = useSelector((state: any) => state.Events);
  const [isActive, setIsActive] = useState(false);
  const handelToggel = () => {
    setIsActive(!isActive)
  }
  
  return (
    <SafeAreaView style={styles.container}>
       <EventDetailsHeader title='Event Details' />
       <View style={styles.body}>
          <View style={[styles.sections, styles.header]}>
             <View style={styles.imgContainer}>
                <Image resizeMode='contain' style={styles.img} source={require('../../../../assets/images/Dashboard/progress.png')} />
             </View>
             <View style={styles.textPrimaryContainer}>
                <Text style={styles.textPrimary}>{selectedEvent.eventTitle}</Text>
                <Text style={styles.textSecondary}>{selectedEvent.eventDescription}</Text>
             </View>
          </View>
          <View style={styles.sections}>
             <Pressable onPress={handelToggel}>
                <View style={styles.toggelContainer}>
                  <View style={styles.toggleLeftViewContainer}>
                    <View style={styles.toggleImgContainer}>
                     <Image resizeMode='contain' style={styles.img} source={require('../../../../assets/images/Dashboard/bullseye.jpeg')} />
                    </View>
                    <Text style={styles.toggleBtnText}>
                       Challenge Info
                    </Text>
                  </View>
                  <View style={styles.toggleRightViewContainer}>
                     <LoadIcon 
                       iconFamily='Entypo'
                       iconName={isActive ? 'chevron-thin-up' : 'chevron-thin-down'}
                       size={22}
                       color={'black'}
                       style={{}}
                      />
                  </View>
                </View>
             </Pressable>
             {
               isActive ? (
                <View style={styles.toggleContainer}>
                   <View style={styles.toggleSection}>
                      <View style={styles.iconContainer}>
                         <LoadIcon iconFamily='MaterialCommunityIcons' iconName='arrow-expand' color='black' style={{}} size={20} />
                      </View>
                      <Text>Record 100 kilometer</Text>
                   </View>
                   <View style={styles.toggleSection}>
                      <View style={[styles.iconContainer, {backgroundColor: 'white'}]}>
                         <LoadIcon iconFamily='Feather' iconName='calendar' color='black' style={{}} size={24} />
                      </View>
                      <Text>20 Mar 2023 - 8 Apr 2023</Text>
                   </View>
                   <View style={styles.toggleSection}>
                      <View style={[styles.iconContainer, {backgroundColor: 'white'}]}>
                         <LoadIcon iconFamily='Ionicons' iconName='flash-outline' color='black' style={{}} size={24} />
                      </View>
                      <Text>Record 100 kilometer</Text>
                   </View>
                </View>
               ): null
             }
          </View>
       </View>
    </SafeAreaView>
  )
}

export default EventDetails

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: 'white'
    },
    sections: {
      borderWidth: 1,
      borderColor: '#eeeeee',
      paddingHorizontal: responsiveScreenWidth(3),
      paddingVertical: responsiveScreenHeight(1.5)
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    body: {
      flex: 1
    },
    imgContainer: {
      width: responsiveScreenWidth(20),
      height: responsiveScreenWidth(20)
    },
    img: {
      width: '100%',
      height: '100%',
    },
    textPrimaryContainer: {
      flex: 1,
      paddingLeft: responsiveScreenWidth(3)
    },
    textPrimary: {
      fontSize: responsiveFontSize(3),
      fontWeight: 'bold',
      color: 'black',
      letterSpacing: 0.3,
      lineHeight: 35
    },
    textSecondary: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: '400',
      color: 'black',
      letterSpacing: 0.3
    },
    toggelContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    toggleLeftViewContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    toggleBtnText: {
      fontSize: responsiveFontSize(2),
      textTransform: 'uppercase',
      fontWeight: '500',
      color: 'black'
    },
    toggleRightViewContainer:{
      width: responsiveScreenWidth(10),
    },
    toggleImgContainer: {
      width: responsiveScreenWidth(8),
      height: responsiveScreenWidth(8),
    },
    toggleContainer: {
      marginTop: responsiveScreenHeight(1.3)
    },
    toggleSection: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconContainer: {
      width: responsiveScreenWidth(6),
      height: responsiveScreenWidth(6),
      marginVertical: responsiveScreenHeight(0.5),
      borderRadius: responsiveScreenWidth(3),
      backgroundColor: '#03C04A',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: responsiveScreenWidth(2)
    }
})