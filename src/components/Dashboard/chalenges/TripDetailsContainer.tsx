import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import HeaderWithBackBtn from '../../../components/common/Headers/HeaderWithBackBtn';

const TripsDetailsContainer: FC<any> = (props) => {
  const Navigation = useNavigation();

  const handlePress = () => {
    Navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackBtn title="Trip Details" />
      <View style={styles.body}>
        {
            props?.title ? <View style={styles.textPrimaryContainer}>
            <Text style={styles.textPrimary}>
               {props.title}
            </Text>
          </View> : null
        }
        {
            props.children
        }
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={handlePress} mode="contained" buttonColor={colorPrimary} style={styles.btn}>
          <Text style={styles.btnText}>Next</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default TripsDetailsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    paddingTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4.5),
    backgroundColor: 'white',
  },
  textPrimaryContainer: {
    width: responsiveScreenWidth(90),
  },
  textPrimary: {
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 0.4,
    fontWeight: 'bold',
    color: 'black',
  },
  dateContainer: {
    width: responsiveScreenWidth(50),
    marginVertical: responsiveScreenHeight(3),
  },
  dateItem: {
    marginVertical: responsiveScreenHeight(2.5),
    position: 'relative'
  },
  dateItemText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    borderWidth: 1.5,
    borderColor: '#eeeeee',
    marginTop: responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1.9),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  dateText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: 'black',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  btn: {
    width: responsiveScreenWidth(90),
    paddingVertical: responsiveScreenHeight(0.4),
  },
  btnText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '700',
  },
  calender: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'visible'
  }
});
