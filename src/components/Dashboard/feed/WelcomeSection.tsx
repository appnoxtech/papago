import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {useNavigation} from '@react-navigation/native';

const WelcomeSection = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    console.log('hello');
  };

  const handlePressRecordActivity = () => {
    navigation.navigate('Record' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Get started, Allen</Text>
      <Text style={styles.subHeading}>
        Go outside to record an activity or import one activity from an other
        app.
      </Text>

      <Button
        mode="contained"
        icon={'record-circle-outline'}
        buttonColor={'#34b8ed'}
        labelStyle={{fontSize: 23}}
        style={styles.btn}
        onPress={handlePressRecordActivity}>
        <Text style={styles.btnText}>Record activity</Text>
      </Button>

      <Button
        mode="outlined"
        icon={'connection'}
        style={styles.outlinedBtn}
        labelStyle={{fontSize: 22, color: colorPrimary}}
        onPress={() => handleClick}>
        <Text style={styles.outlinedBtnText}>Connect Tracker</Text>
      </Button>
    </View>
  );
};

export default WelcomeSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlinedBtn: {
    marginTop: responsiveScreenHeight(2),
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(90),
    borderColor: colorPrimary,
  },
  btnText: {
    fontSize: responsiveFontSize(2.3),
    color: 'white',
  },
  outlinedBtnText: {
    fontSize: responsiveFontSize(2.3),
    color: colorPrimary,
  },
  btn: {
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(90),
  },
  heading: {
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: responsiveScreenHeight(1.5),
  },
  subHeading: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: responsiveFontSize(2),
    color: 'black',
    marginBottom: responsiveScreenHeight(2),
  },
});
