import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import HikingRoutesCard from './HikingRoutesCard';

const HikingRoutesContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textPrimary}>Hiking route near you</Text>
        <Button mode="contained" buttonColor={'#34b8ed'} style={styles.btn}>
          <Text style={styles.btnText}>Explore</Text>
        </Button>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <HikingRoutesCard />
        <HikingRoutesCard />
        <HikingRoutesCard />
      </ScrollView>
    </View>
  );
};

export default HikingRoutesContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  btn: {
    width: responsiveScreenWidth(23),
    height: responsiveScreenHeight(4.9),
    padding: 0,
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPrimary: {
    fontSize: responsiveFontSize(2.7),
    color: 'black',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingTop: responsiveScreenHeight(2),
  },
});
