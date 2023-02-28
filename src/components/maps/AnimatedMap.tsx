import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ImplicitFlow, Mapcreator, PasswordFlow} from '@mapcreator/api';


const AnimatedMap = () => {
  var API_CLIENT_ID = 161; 
  // Callback url is set to the current url by default
  var auth = new ImplicitFlow(API_CLIENT_ID);  
  var api = new Mapcreator(auth);
  useEffect(() => {
    api.authenticate();
  }, []);

  return (
    <View>
      <Text>AnimatedMap</Text>
    </View>
  );
};

export default AnimatedMap;

const styles = StyleSheet.create({});
