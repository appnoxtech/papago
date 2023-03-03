import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {GOOGLE_CLIENT_ID} from '@env';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {SsoService} from '../../../services/auth/AuthService';
import {ssoData} from '../../../interfaces/auth/authInterface';
import {useDispatch} from 'react-redux';
import {updateUserData} from '../../../redux/reducers/user';
import { useAuthHooks } from '../../../hooks/authHooks';

interface props {
  label: string;
  type: string;
}

const SocialLoginBtn: React.FC<props> = ({label, type}) => {
  const dispatch = useDispatch();
  const {handleUserLogin} = useAuthHooks();
  const handleSSOAuth = async (data: ssoData) => {
    console.log('data', data);
    try {
      const res = await SsoService(data);
      console.log('res.data', res.data);
      // await saveUserData(res.data);
      const Data = res.data.data;
      const userInfo = {
        accessToken: Data.accessToken,
        userName: Data.userName,
        name: Data.name,
        userId: Data.userId
      };
      handleUserLogin(userInfo);
      dispatch(updateUserData(true));
      Alert.alert('Notification', 'Successfully Logged In');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const loginFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          // console.log(
          //   'Login success with permissions: ' +
          //     result.grantedPermissions.toString(),
          // );
          AccessToken.getCurrentAccessToken().then((data: any) => {
            let accessToken = data.accessToken;
            console.log(accessToken.toString());
  
            const responseInfoCallback = (error: any, result: any) => {
              if (error) {
                console.log('Error fetching data: ' + error.toString());
              } else {
                const FB_USER_CRED = {
                  SSO: 'FACEBOOK',
                  name: result.name as string,
                  userName: result.first_name as string,
                  facebookId: parseInt(result.id, 10) as number,
                };
                handleSSOAuth(FB_USER_CRED);
              }
            };
  
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );
  
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error: any) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const handlePress = () => {
    if (type === 'facebook') {
      console.log('pressed');
      loginFacebook();
    } else {
      googleSignIn();
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      const data = {
        email: userInfo.user.email,
        SSO: 'GOOGLE',
        googleId: parseInt(userInfo.user.id, 10),
        userName: userInfo.user.givenName,
        name: userInfo.user.name,
      };
      handleSSOAuth(data);
    } catch (error: any) {
      console.log('Message', error.message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.btnContainer}>
          <View style={styles.btnImageContainer}>
            {type === 'google' ? (
              <Image
                source={require('../../../../assets/images/google.png')}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <FontAwesome
                name="facebook-official"
                style={styles.icon}
                color={'#1877f2'}
              />
            )}
          </View>
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>{label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginBtn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: responsiveScreenHeight(1),
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: '100%', width: '100%'},
  btnContainer: {
    width: '100%',
    borderRadius: responsiveScreenWidth(3),
    backgroundColor: '#E0E0E0',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(0.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnImageContainer: {
    width: responsiveScreenWidth(8),
    height: responsiveScreenHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingStart: responsiveScreenWidth(3),
  },
  btnText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2),
  },
  icon: {
    fontSize: responsiveFontSize(3),
  },
});
