import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles} from '../../../../assets/styles/GlobalStyles';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorGrey} from '../../../../assets/styles/GlobalTheme';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

interface props {
  title: string;
}

const HeaderWithBackBtn = ({title}: props) => {
  const navgation = useNavigation();

  const handlePress = () => {
    navgation.navigate('Record' as never);
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
        onPress={() => console.log('Hello')}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderWithBackBtn;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: responsiveScreenHeight(1.3),
    borderBottomColor: colorGrey,
    borderBottomWidth: 0.5,
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
  },
});
