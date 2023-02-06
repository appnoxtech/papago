import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackBtn from '../../components/common/buttons/BackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';


const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <BackBtn />
          <View>
            <Text style={styles.heading}>Terms of service</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View>
          <Text style={styles.primaryText}>
            Welcome at Relive: Relive offers an application for mobile devices
            that allows you to relive all your outdoor adventures. These terms
            and conditions (Terms) apply to: the relationship between Relive
            B.V. (Relive) and its users (Users); being any use of www.relive.cc
            (the Website), the mobile application (App) and any other service
            offered by Relive. Relive offers the App, including all information,
            tools and services available from the App, under the condition that
            the User accepts these Terms
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  header: {
    borderBottomWidth: 0.8,
    borderColor: '#bbc2cb',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.6),
    textAlign: 'center',
  },
  primaryText: {
    // fontFamily: 'NunitoSans-Regular',
    fontSize: responsiveFontSize(2.3),
    textAlign: 'justify',
  },
  body: {
    paddingHorizontal: responsiveScreenWidth(4),
    paddingTop: responsiveScreenHeight(2),
  },
})
