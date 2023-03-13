import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Button} from 'react-native-paper';
import useNavigate from '../../hooks/navigation/navigationHook';

const OnBoardingPage = () => {
  const NavigateTo = useNavigate();
  return (
    <ImageBackground
      style={styles.flex_1}
      resizeMode="cover"
      source={require('../../../assets/images/homepage.jpeg')}>
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <View style={styles.headerContainer}>
          <View style={styles.content}>
            <Avatar.Image
              size={30}
              source={require('../../../assets/images/logo.jpeg')}
            />
            <Text style={styles.textLogo}>Papa Go</Text>
          </View>
        </View>
        <View style={styles.mainBody}>
          <View style={styles.primaryTextContainer}>
            <View style={[styles.textContainer]}>
              <Text style={styles.primaryText}>All of your</Text>
              <Text style={styles.primaryText}>activities in one</Text>
              <Text style={styles.primaryText}>place.</Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              buttonColor={'#34b8ed'}
              style={styles.btn}
              onPress={() => NavigateTo('Signup')}>
              Get Started
            </Button>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerTextSuggestion}>
              {'Already use Papa Go? '}
            </Text>
            <Pressable onPress={() => NavigateTo('Login')}>
              <Text style={styles.navText}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnBoardingPage;

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    height: responsiveScreenHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogo: {
    // fontFamily: 'DancingFont-SemiBold',
    fontSize: responsiveFontSize(4),
    color: 'white',
    marginLeft: responsiveScreenWidth(2),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBody: {
    position: 'absolute',
    bottom: responsiveScreenHeight(1),
    width: '100%',
  },
  primaryText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(4.7),
    color: 'white',
    textAlign: 'center',
  },
  primaryTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    width: responsiveScreenWidth(80),
  },
  btn: {
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(95),
  },
  btnContainer: {
    marginTop: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    marginTop: responsiveScreenHeight(15),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerTextSuggestion: {
    fontSize: responsiveFontSize(2.1),
    color: 'white',
    // fontFamily: 'NunitoSans-Regular',
  },
  navText: {
    color: 'white',
    fontSize: responsiveFontSize(2.1),
    // fontFamily: 'NunitoSans-Regular',
  },
});
