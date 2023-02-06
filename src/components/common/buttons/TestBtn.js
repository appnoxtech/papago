import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '1016049717921-nljci850tkc5mkbv9vjophsdufhtf9qc.apps.googleusercontent.com',
  offlineAccess: true,
});
const GoogleSignIn = () => {
  const [userState, setUserState] = useState({});

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserState({
        ...userInfo,
      });
    } catch (error) {
      console.log('eroro', error.message);
    }
  };

  console.log('userDtatw', userState);

  return (
    <GoogleSigninButton
      style={{width: 162, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleSignIn}
    />
  );
};

export default GoogleSignIn;
