import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";

import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Platform } from 'react-native';

const useRecordActivityNotification = () => {
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const {timer, isActive, distance, speed} = useSelector(
    (state: any) => state.recordActivity,
  );
  const recordStatus = useSelector((state: any) => state.recordStatus);
  const {isStart, isPaused, isEnd} = recordStatus;

  useEffect(() => {
   if(isStart) {
     Platform.OS === 'android' ? AndroidNotification('Started') :ShowRecordNotifications('Started');
   }
  }, [isStart]);

  useEffect(() => {
    if(isStart && isPaused) {
      Platform.OS === 'android' ? AndroidNotification('Paused') :ShowRecordNotifications('Paused');
    }else if(isStart && !isPaused) {
      Platform.OS === 'android' ? AndroidNotification('Started') :ShowRecordNotifications('Started');;
    }
  }, [isPaused]);

  const ShowRecordNotifications = (state: string) => {
    PushNotification.cancelLocalNotification('123');
    PushNotification.localNotification({
      id: '123',
      ongoing:true,
      channelId: 'record_notification',
      title: 'Record Activity',
      message:  `${selectedActivity.activityName} - ${state}`,
      repeatTime: 1,
    })
  };

  const AndroidNotification = (state: string) => {
    PushNotification.cancelLocalNotification('123');
    PushNotification.localNotification({
      id: '123',
      ongoing:true,
      channelId: 'record_notification',
      title: 'Record Activity',
      message:  `${selectedActivity.activityName} - ${state}`,
      repeatTime: 1,
    })
  }

};

export default useRecordActivityNotification;
