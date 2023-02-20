import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import useGenerateDynamicLinks from '../../../hooks/dynamicLinks/createDynamicLinks';

interface props {
  iconName: 'facebook' | 'whatsapp' | 'instagram' | 'dots-three-horizontal';
  Label: 'Facebook' | 'Whatsapp' | 'Instagram' | 'Others';
  url: string;
}

interface customOptions {
  backgroundImage?: string;
  appId?: string;
  title: string;
  message: string;
  url: string;
  social: string;
  whatsAppNumber: string;
  filename: string;
  attributionURL?: string;
}
const SocialShareBtn: React.FC<props> = ({iconName, Label, url}) => {

  const getBtnBackgroundColor = () => {
    if (Label === 'Whatsapp') {
      return '#25d366';
    } else if (Label === 'Facebook') {
      return '#4267B2';
    } else if (Label === 'Instagram') {
      return 'white';
    } else {
      return 'white';
    }
  };


  const handleShareActivity = () => {
    if (Label === 'Others') {
      const options = {
        url: url,
        message: 'Teting',
      };
      Share.open(options);
    } else if (Label === 'Whatsapp') {
      Share.shareSingle({
        title: 'Share via whatsapp',
        message: 'some awesome dangerous message',
        url: url,
        social: Share.Social.WHATSAPP,
      });
    } else if (Label === 'Facebook') {
      Share.shareSingle({
        backgroundImage: url, // url or an base64 string
        appId: '1841318379580781', //facebook appId
        social: Share.Social.FACEBOOK_STORIES,
      });
    }else if (Label === 'Instagram') {
      Share.shareSingle({
        url: 'instagram://share', 
        social: Share.Social.INSTAGRAM
      })
    } else {
      const options = {
        url: url,
        message: 'Teting',
      };
      Share.open(options);
    }
  };
  return (
    <View style={styles.mainContainer}>
      {Label !== 'Instagram' ? (
        <Pressable onPress={handleShareActivity}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: getBtnBackgroundColor(),
                borderColor: Label === 'Others' ? 'black' : 'white',
              },
            ]}>
            {Label === 'Others' ? (
              <Entypo name={iconName} size={20} color="black" />
            ) : (
              <FontAwesome name={iconName} size={20} color="white" />
            )}
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={handleShareActivity}>
          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 1.0}}
            style={styles.container}>
            <FontAwesome name={iconName} size={20} color="white" />
          </LinearGradient>
        </Pressable>
      )}

      <Text style={styles.btnLabel}>{Label}</Text>
    </View>
  );
};

export default SocialShareBtn;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  container: {
    borderRadius: responsiveScreenWidth(5),
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: 'white',
  },
  btnLabel: {
    fontSize: responsiveFontSize(1.5),
    color: '#bbbbbb',
    fontWeight: 'bold',
    marginTop: responsiveScreenHeight(0.6),
  },
});
