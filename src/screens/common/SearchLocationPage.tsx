import {StyleSheet, DeviceEventEmitter} from 'react-native';
import React, {FC, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_APIKEY} from '@env';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {planTripCords} from '../../interfaces/reducers/PlanTripInterface';
import {useNavigation} from '@react-navigation/native';

const SearchLocationPage: FC<any> = ({route}) => {
  const {id} = route.params;
  const Navigation = useNavigation();
  useEffect(() => {
    return () => {
      DeviceEventEmitter.removeAllListeners(`${id}`);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          const cords = {
            longitude: details?.geometry.location.lng,
            latitude: details?.geometry.location.lat,
          };

          const planTripCords: planTripCords = {
            cords: cords,
            name: data.description,
          };

          const eventData = {
            id,
            planTripCords,
          };
          console.log('eventData', eventData);
          if(id === 'stops') {
            DeviceEventEmitter.emit(`${id}`, planTripCords);
          }else{
            DeviceEventEmitter.emit(`${id}`, eventData);
          }
          
          Navigation.goBack();
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1.5,
            borderRadius: 5,
            borderColor: '#eeeeee',
          },
        }}
        query={{
          key: 'AIzaSyCqfGg2nqTg5samCk8B1Y2Rhjf32_5yKgQ',
          language: 'en',
        }}
      />
    </SafeAreaView>
  );
};

export default SearchLocationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: responsiveScreenWidth(2),
  },
});
