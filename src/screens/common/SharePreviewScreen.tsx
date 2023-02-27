import {StyleSheet, Text, View, Appearance} from 'react-native';
import React, {FC, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import HeaderWithNextBtn from '../../components/common/Headers/HeaderWithNextBtn';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import RenderActivityIcon from '../../components/common/RenderActivityIcon';

const SharePreviewScreen: FC<any> = ({route}) => {
  const {source, activityDetails} = route.params;
  const shareActvityHandler = () => {
    getActivityImage();
  };
  const shareCardRef = useRef(null);

  const getActivityImage = () => {
    captureRef(shareCardRef, {
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => handleShareActivity(uri),
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const handleShareActivity = (uri: string) => {
    if (source === 'Others') {
      const options = {
        message: 'Checkout my Activty',
        title: 'Actvity',
        url: `file://${uri}`,
      };
      Share.open(options);
    } else if (source === 'Whatsapp') {
      Share.shareSingle({
        title: 'Share via whatsapp',
        message: 'Hey Checkout this Activity.',
        url: `file://${uri}`,
        social: Share.Social.WHATSAPP,
      });
    } else if (source === 'Facebook') {
      Share.shareSingle({
        backgroundImage: `file://${uri}`, // url or an base64 string
        backgroundBottomColor: '#fefefe',
        backgroundTopColor: '#906df4',
        message: 'Checkout my Activty',
        appId: '1841318379580781', //facebook appId
        social: Share.Social.FACEBOOK_STORIES,
      });
    } else if (source === 'Instagram') {
      Share.shareSingle({
        social: Share.Social.INSTAGRAM,
        url: `file://${uri}`,
        type: 'image/*',
      });
    } else {
      const options = {
        url: `file://${uri}`,
        message: 'Teting',
      };
      Share.open(options);
    }
  };

  console.log('theme', Appearance.getColorScheme());

  const renderDistance = (distance: number) => {
    if (distance < 1) {
      return distance * 1000;
    } else {
      return distance.toFixed(2);
    }
  };

  const renderDistanceMeter = (distance: number) => {
    if (distance < 1) {
      return 'Meter';
    } else {
      return 'Kilometer';
    }
  };

  const getTimeFormat = (timer: number) => {
    var d = new Date(1000 * Math.round(timer / 1000)); // round to nearest second
    function pad(i: number) {
      return ('0' + i).slice(-2);
    }
    if (d.getUTCHours() === 0) {
      var str = pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
      return str;
    } else {
      var str =
        d.getUTCHours() +
        ':' +
        pad(d.getUTCMinutes()) +
        ':' +
        pad(d.getUTCSeconds());
      return str;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithNextBtn
        onPressHandler={shareActvityHandler}
        BtnLabel="Next"
        title="Share"
      />
      <View ref={shareCardRef} style={styles.previewActvityContainer}>
        <View style={styles.shareCardHeaderContainer}>
          <Text style={styles.shareCardHeader}>Papa Go</Text>
        </View>
        <View style={styles.shareCardBody}>
          <RenderActivityIcon
            size={60}
            Activity={activityDetails.activityData}
          />
          <View style={styles.shareCardTextPrimaryContainer}>
            <Text style={styles.shareCardTextPrimary}>
              {renderDistance(activityDetails.distance)}
            </Text>
            <View style={styles.rectangle}></View>
          </View>
          <View>
            <Text style={styles.shareCardTextSecondary}>
              {renderDistanceMeter(activityDetails.distance)}
            </Text>
          </View>
        </View>
        <View style={styles.shareCardFooter}>
          <View style={styles.shareCardWatchContainer}>
            <Entypo style={styles.icon} name="stopwatch" size={25} />
            <Text style={styles.textTime}>
              {getTimeFormat(activityDetails.duration)}
            </Text>
          </View>
          <View style={styles.shareCardWatchContainer}>
            <Text style={styles.textTime}>{`${renderDistance(activityDetails.distance)} ${activityDetails.distance > 1 ? 'Km': 'm'}`}</Text>
          </View>
          <View style={styles.shareCardWatchContainer}>
            <MaterialIcons style={styles.icon} name="speed" size={25} />
            <Text style={styles.textTime}>
              {(
                activityDetails.distance /
                (activityDetails.duration / 3600000)
              ).toFixed(2)}{' '}
              km/h
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SharePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    paddingVertical: responsiveScreenHeight(1),
  },
  previewActvityContainer: {
    marginVertical: responsiveScreenHeight(2),
    marginHorizontal: responsiveScreenWidth(2),
    borderWidth: 1,
    borderColor: '#bbbbbb',
    paddingHorizontal: responsiveScreenWidth(2.4),
    paddingVertical: responsiveScreenHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  shareCardHeaderContainer: {
    width: '100%',
  },
  shareCardHeader: {
    fontSize: responsiveFontSize(2.8),
    textAlign: 'right',
    color: colorPrimary,
    fontWeight: 'bold',
  },
  shareCardBody: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(2),
  },
  shareCardTextPrimary: {
    fontSize: responsiveFontSize(15),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  rectangle: {
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(6),
    backgroundColor: colorPrimary,
    position: 'absolute',
    bottom: responsiveScreenHeight(-2.8),
  },
  shareCardTextPrimaryContainer: {
    position: 'relative',
    width: responsiveScreenWidth(95),
    marginBottom: responsiveScreenHeight(4.5),
  },
  shareCardTextSecondary: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: 'black',
  },
  shareCardFooter: {
    width: responsiveScreenWidth(70),
    paddingVertical: responsiveScreenHeight(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTime: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
  },
  shareCardWatchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: responsiveScreenWidth(1),
  },
});
