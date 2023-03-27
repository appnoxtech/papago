import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function GetFCMToken() {
    if(Platform.OS === 'ios') {
        return '';
    }
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if(!fcmToken){
       try {
        const fcmToken = await messaging().getToken();
        if(fcmToken) {
            await AsyncStorage.setItem('fcmToken', fcmToken);
            return fcmToken;
        }
       } catch (error) {
         Alert.alert('Notification', 'Getting Errror while Fetching FCM Tokken')
       }
    }else {
        return fcmToken;
    }
}

export const NotificationListner = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });

        messaging().onMessage(async remoteMessage => {
            console.log('Notification on forground state ...', remoteMessage);
        })
} 