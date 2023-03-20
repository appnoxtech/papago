import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBackBtn from '../../../components/common/Headers/HeaderWithBackBtn'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Button } from 'react-native-paper'
import { colorPrimary } from '../../../../assets/styles/GlobalTheme'
import { DeleteEventTripByIDService, UpdateEventTripService } from '../../../services/Dashboard/events.service'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateSelectedEvent } from '../../../redux/reducers/events.reducer'
import { useNavigation } from '@react-navigation/native'
import useGetEventListHook from '../../../hooks/Events/GetEventListHook'

const EventSetting: FC<any> = () => {
  const GetEventList = useGetEventListHook();
  const {selectedEvent} = useSelector((state: any) => state.Events);
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const [eventTitle, setEventTitle] = useState(selectedEvent.eventTitle);
  const [eventDescription, setEventDescription] = useState(selectedEvent.eventDescription);
  
  const handelSaveChanges = async() => {
    try {
        const data = {
            ...selectedEvent,
            eventTitle: eventTitle,
            eventDescription: eventDescription
        }
        console.log('data', data);
        
        const res = await UpdateEventTripService(data);
        dispatch(UpdateSelectedEvent(data));
        Navigation.goBack();
    } catch (error) {
        Alert.alert('Error', 'Get Error while updating the Event')
    }
  }

  const handelEventDelete = () => {
    Alert.alert('Notification', 'Are you sure ?', [
        { text: 'Yes', onPress: () => deleteTrip() },
        { text: 'No', onPress: () => console.log('Ask me later pressed') }
    ])
  }

  const deleteTrip = async() => {
    try {
        await DeleteEventTripByIDService(selectedEvent._id);
        Alert.alert('Notification', 'Event Deleted Successfully.')
        GetEventList();
        Navigation.navigate('Events' as never);
    } catch (error: any) {
        Alert.alert('Error', error.response.data.errors[0].message)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
        <HeaderWithBackBtn title='Event Setting' />
        <View style={styles.body}>
           <View>
              <View style={styles.textPrimaryContainer}><Text style={styles.textPrimary}>Change your challenge details</Text></View>
              <View style={styles.textInputContainer}>
                 <Text style={styles.inputTitle}>Event Title</Text>
                 <TextInput
                   style={styles.textInput}
                   value={eventTitle}
                   onChangeText={setEventTitle}
                   maxLength={40}
                 />
                 <View style={styles.textInputFooter}>
                    <Text style={styles.textCount}>40</Text>
                    <Text style={styles.slash}>{`/`}</Text>
                    <Text style={styles.textCount}>{`${eventTitle.length}`}</Text>
                 </View>
              </View>
              <View style={styles.textInputContainer}>
                 <Text style={styles.inputTitle}>Event Description</Text>
                 <TextInput
                   style={styles.textInput}
                   value={eventDescription}
                   multiline={true}
                   onChangeText={setEventDescription}
                 />
                  <View style={styles.textInputFooter}>
                    <Text style={styles.textCount}>500</Text>
                    <Text style={styles.slash}>{`/`}</Text>
                    <Text style={styles.textCount}>{`${eventDescription.length}`}</Text>
                 </View>
              </View>
           </View>
        </View>
        <View style={styles.footer}>
            <Button
               mode='contained'
               buttonColor={colorPrimary}
               style={styles.btn}
               onPress={handelSaveChanges}
            >
                <Text style={styles.btnText}>Save Changes</Text>
            </Button>
            <Button
               mode='contained'
               buttonColor={'white'}
               style={styles.btn}
               onPress={handelEventDelete}
            >
                <Text style={[styles.btnText, {color: '#D03124'}]}>Delete this Event</Text>
            </Button>
        </View>
    </SafeAreaView>
  )
}

export default EventSetting

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    body: {
        flex: 1,
        paddingHorizontal: responsiveScreenWidth(4.4),
        paddingVertical: responsiveScreenHeight(2),
    },
    textPrimary: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: 'bold',
        color: 'black'
    },
    textInput: {
        paddingHorizontal: responsiveScreenWidth(3),
        paddingVertical: responsiveScreenHeight(1.4),
        borderWidth: 2,
        borderColor: '#eeeeee',
        borderRadius: 7,
        marginVertical: responsiveScreenHeight(0.7),
        fontSize: responsiveFontSize(2.2),
        fontWeight: '400'
    },
    textInputContainer: {
       marginVertical: responsiveScreenHeight(1.5)
    },
    inputTitle: {
        fontSize: responsiveFontSize(1.6),
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    textPrimaryContainer: {
        marginVertical: responsiveScreenHeight(1.5)
    },
    textInputFooter: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    textCount: {
       fontSize: responsiveFontSize(1.5),
       color: 'grey',
    },
    slash:{
        fontSize: responsiveFontSize(2),
        color: 'grey',
    },
    footer: {
        paddingHorizontal: responsiveScreenWidth(4.4),
        paddingVertical: responsiveScreenHeight(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: responsiveScreenWidth(90),
        paddingVertical: responsiveScreenHeight(0.5),
        marginVertical:responsiveScreenHeight(1)
    },
    btnText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold'
    },

})