import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const TermsCondition = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        {"By creating an account, you agree to PapaGo's "}
        <Text style={styles.textLink}>terms and conditions of use.</Text>
      </Text>
      <Text
        style={[styles.textStyle, {marginTop: responsiveScreenHeight(0.7)}]}>
        {
          "Total learn more about how Papa Go collects, uses, shares and protests your personal data, please read Papa's Go "
        }
        <Text style={styles.textLink}>privacy policy.</Text>
      </Text>
    </View>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(1),
  },
  textStyle: {
    fontSize: responsiveFontSize(1.5),
    // fontFamily: 'NunitoSans-Regular',
  },
  textLink: {
    fontSize: responsiveFontSize(1.5),
    marginLeft: responsiveScreenWidth(1),
    textDecorationLine: 'underline',
    fontWeight: 'bold'
    // fontFamily: 'NunitoSans-Bold',
  },
});
