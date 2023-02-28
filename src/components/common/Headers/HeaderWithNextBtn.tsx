import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles} from '../../../../assets/styles/GlobalStyles';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorGrey, colorPrimary} from '../../../../assets/styles/GlobalTheme';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import { Button } from 'react-native-paper';

interface props {
  title: string;
  BtnLabel:string;
  onPressHandler: any
}

const HeaderWithNextBtn = ({title, BtnLabel, onPressHandler}: props) => {
  const navgation = useNavigation();

  const handlePress = () => {
    navgation.goBack();
  };

  return (
    <View style={[Styles.bgWhite, styles.container]}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'default'}
        showHideTransition={'slide'}
      />

      <Entypo
        style={styles.btnContainer}
        name="chevron-left"
        size={32}
        onPress={handlePress}
      />

      <Text style={styles.title}>{title}</Text>

      <Button style={styles.rightBtn} onPress={onPressHandler}>
        <Text style={styles.rightBtnText}>{BtnLabel}</Text>
      </Button>

    </View>
  );
};

export default HeaderWithNextBtn;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: responsiveScreenHeight(1.3),
    borderBottomColor: colorGrey,
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  btnContainer: {
    position: 'absolute',
    top: responsiveScreenHeight(1.1),
    left: responsiveScreenHeight(1),
    width: responsiveScreenWidth(8),
    color: 'black',
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    width: responsiveScreenWidth(80)
  },
  rightBtn: {
    position: 'absolute',
    top: responsiveScreenHeight(1.1),
    right: responsiveScreenHeight(1),
    width: responsiveScreenWidth(10),
  },
  rightBtnText: {
    fontSize: responsiveFontSize(2.3),
    color: colorPrimary,
  }
});
