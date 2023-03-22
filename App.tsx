import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store/store';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import StackNavigation from './src/routes/StackNavigation';
import useListenDynamicLinks from './src/hooks/dynamicLinks/listenDynamicLinks';
import * as Sentry from '@sentry/react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {
  NotificationListner,
  requestUserPermission,
} from './src/utlis/PushNotification.helper';
import {Platform} from 'react-native';
Sentry.init({
  dsn: 'https://b248340964f34edbb7eb11cdaee234e6@o4504756924514304.ingest.sentry.io/4504768465207296',
});

export default function App() {
  const handelPushNotification = () => {
    requestUserPermission();
    NotificationListner();
  };

  useEffect(() => {
    Platform.OS === 'android' ? handelPushNotification() : null;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <PaperProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
