import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Styles} from '../../../../assets/styles/GlobalStyles';

const HikingRoutesCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={require('../../../../assets/images/Dashboard/mapRoutes.jpeg')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.textPrimary}>Trikuta WLS</Text>
        <View style={styles.distanceContainer}>
          <View style={Styles.flexRow}>
            <MaterialCommunityIcons size={15} name="map-marker-distance" />
            <Text style={styles.routeLength}>10.8 Km</Text>
          </View>
          <View>
            <Text style={styles.distance}>55 Km Away</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HikingRoutesCard;

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(52),
    marginHorizontal: responsiveScreenWidth(3),
  },
  distance: {
    fontSize: responsiveFontSize(1.5),
    marginLeft: responsiveScreenWidth(1),
    fontWeight: 'bold',
  },
  routeLength: {
    fontSize: responsiveFontSize(1.5),
    marginLeft: responsiveScreenWidth(1.3),
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    height: responsiveScreenHeight(14),
    borderRadius: 10,
    overflow: 'hidden',
  },
  footer: {
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1),
    backgroundColor: 'white',
  },
  textPrimary: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
  distanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(1),
  },
});
