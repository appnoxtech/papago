import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Share from 'react-native-share';
import {
  AppInstalledChecker,
  CheckPackageInstallation,
} from 'react-native-check-app-install';
import SocialShareBtn from './buttons/SocialShareBtn';
import {Button} from 'react-native-paper';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { colorPrimary } from '../../../assets/styles/GlobalTheme';

interface props {
  url: string;
}

const SocialBtnList: React.FC<props> = ({url}) => {
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [isFacebook, setIsFacebook] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);
  useEffect(() => {
    // check if whatsapp is install or not
    AppInstalledChecker.isAppInstalled('whatsapp').then(
      (isInstalled: boolean) => {
        // isInstalled is true if the app is installed or false if not
        if (isInstalled) {
          setIsWhatsapp(true);
        } else {
          setIsWhatsapp(false);
        }
      },
    );

    // check if facebook is install or not
    AppInstalledChecker.isAppInstalled('facebook').then(
      (isInstalled: boolean) => {
        // isInstalled is true if the app is installed or false if not
        if (isInstalled) {
          setIsFacebook(true);
        } else {
          setIsFacebook(false);
        }
      },
    );

    // check if instagram is install or not
    AppInstalledChecker.isAppInstalled('instagram').then(
      (isInstalled: boolean) => {
        // isInstalled is true if the app is installed or false if not
        if (isInstalled) {
          setIsInstagram(true);
        } else {
          setIsInstagram(false);
        }
      },
    );
  });

  const handlePress = () => {
    const options = {
        url: url,
        message: 'Teting',
      };
      Share.open(options);
  }
  return (
    <>
      {isWhatsapp ? (
        <SocialShareBtn url={url} iconName="whatsapp" Label="Whatsapp" />
      ) : null}
      {isFacebook ? (
        <SocialShareBtn url={url} iconName="facebook" Label="Facebook" />
      ) : null}
      {isInstagram ? (
        <SocialShareBtn url={url} iconName="instagram" Label="Instagram" />
      ) : null}
      {!isFacebook && !isInstagram && !isWhatsapp ? (
       <View style={styles.btnContainer}>
         <Button
          mode='contained'
          buttonColor={colorPrimary}
          style={styles.btn}
          onPress={handlePress}
         >
            <Text style={styles.btnText}>Share</Text>
        </Button>
       </View>
      ) : (
        <SocialShareBtn
          url={url}
          iconName="dots-three-horizontal"
          Label="Others"
        />
      )}
    </>
  );
};

export default SocialBtnList;

const styles = StyleSheet.create({
    btnText: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        letterSpacing: 0.7
    },
    btnContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: responsiveScreenWidth(80),
        paddingVertical: responsiveScreenHeight(0.5)
    }
});