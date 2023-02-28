import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import StackNavigation from './src/routes/StackNavigation';
import useListenDynamicLinks from './src/hooks/dynamicLinks/listenDynamicLinks';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
