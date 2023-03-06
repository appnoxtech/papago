import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';

const useRecordActivityNotification = () => {
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const {timer, isActive, distance, speed} = useSelector(
    (state: any) => state.recordActivity,
  );
  const recordStatus = useSelector((state: any) => state.recordStatus);
  const {isStart, isPaused, isEnd} = recordStatus;

  useEffect(() => {
   if(isStart) {
     ShowRecordNotifications('Started');
   }
  }, [isStart]);

  useEffect(() => {
    if(isStart && isPaused) {
       ShowRecordNotifications('Paused'); 
    }else if(isStart && !isPaused) {
       ShowRecordNotifications('Started');
    }
  }, [isPaused]);


  const getSecondDigit = () => {
    let seconds = Math.floor((timer / 1000) % 60);
    if (seconds < 10) {
      return `0${seconds}`;
    } else {
      return seconds;
    }
  };

  const getMinutesDigit = () => {
    let minutes = Math.floor((timer / 60000) % 60);
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  };

  const ShowRecordNotifications = (state: string) => {
    PushNotificationIOS.addNotificationRequest({
      id: 'record_notification',
      body: `${
        selectedActivity.activityName
      } - ${state}`,
    });
  };

};

export default useRecordActivityNotification;
