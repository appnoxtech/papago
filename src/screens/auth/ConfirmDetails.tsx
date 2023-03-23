import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackBtn from '../../components/common/buttons/BackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TextInputComponent from '../../components/common/inputs/TextInputComponent';
import {inputsHandlerParams} from '../../interfaces/components/inputs';
import {Button, TextInput} from 'react-native-paper';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';

const initialState = {
  name: '',
  userName: '',
};

const errorInitialState = {
  name: '',
  userName: '',
};

interface props {
  subLabel: string;
  data: string;
  error: boolean;
  changeHandler: any;
  helpingText: string;
  clickHandler: any;
  btnText: string;
  inputLabel: string;
  isLoading?: boolean;
}

const ConfirmDetails: FC<props> = ({
  subLabel,
  data,
  error,
  changeHandler,
  helpingText,
  clickHandler,
  btnText,
  inputLabel,
  isLoading = false,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.mainContainer}>
              <View>
                <View style={styles.imgContainer}>
                  <Image
                    source={require('../../../assets/images/common/routes.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.backBtnContainer}>
                    <BackBtn />
                  </View>
                </View>
              </View>
              <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                style={styles.body}>
                <View style={styles.primaryTextContainer}>
                  <Text style={styles.textPrimary}>Who's joining?</Text>
                  <Text style={styles.subText}>{subLabel}</Text>
                </View>
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  label={inputLabel}
                  activeOutlineColor={colorPrimary}
                  outlineColor={error ? 'red' : 'grey'}
                  value={data}
                  theme={{roundness: 11}}
                  textColor={'#8391A1'}
                  onChangeText={value => changeHandler({value})}
                />
                <View style={styles.helpingTextContainer}>
                  <Text style={styles.helpingText}>{helpingText}</Text>
                </View>
              </KeyboardAvoidingView>
              <View style={styles.footer}>
                {isLoading ? (
                  <Button
                    mode="contained"
                    buttonColor={'#34b8ed'}
                    style={styles.btn}
                    loading={true}>
                    Loading
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    buttonColor={colorPrimary}
                    style={styles.btn}
                    onPress={clickHandler}>
                    <Text style={styles.btnText}>{btnText}</Text>
                  </Button>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ConfirmDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
  },
  imgContainer: {
    position: 'relative',
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(32),
    marginBottom: responsiveScreenHeight(0.3),
  },
  image: {height: '100%', width: '100%'},
  backBtnContainer: {
    position: 'absolute',
    top: 0,
    left: responsiveScreenWidth(2),
  },
  primaryTextContainer: {
    marginVertical: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2.5),
  },
  body: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(4),
  },
  textPrimary: {
    fontSize: responsiveFontSize(4.5),
    fontWeight: 'bold',
    color: 'black',
    lineHeight: responsiveScreenHeight(7),
  },
  subTextContainer: {
    marginBottom: responsiveScreenHeight(2),
  },
  subText: {
    fontSize: responsiveFontSize(3),
    fontWeight: '300',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: responsiveScreenWidth(3),
    height: responsiveScreenHeight(7),
    fontSize: responsiveFontSize(2.5),
  },
  helpingTextContainer: {
    marginVertical: responsiveScreenHeight(1),
    width: responsiveScreenWidth(80),
    paddingLeft: responsiveScreenWidth(1),
  },
  helpingText: {
    fontSize: responsiveFontSize(2),
    color: 'grey',
    letterSpacing: 0.4,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveScreenHeight(2),
  },
  btn: {
    width: responsiveScreenWidth(90),
    paddingVertical: responsiveScreenHeight(0.5),
  },
  btnText: {
    fontSize: responsiveFontSize(2.3),
  },
});
