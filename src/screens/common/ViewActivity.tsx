import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderWithBackBtn from '../../components/common/Headers/HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';
import SocialShareBtn from '../../components/common/buttons/SocialShareBtn';
import ActivityMapPreview from '../../components/Dashboard/common/ActivityMapPreview';
import {GetActivityByIdService} from '../../services/Dashboard/record.service';
import {
  activity,
  cords,
  data,
} from '../../interfaces/Dashboard/record.interface';
import {
  getDayFromTimestamp,
  getMonthNameByIndex,
  getYearFromTimeStamp,
} from '../../utlis/common';
import useGenerateDynamicLinks from '../../hooks/dynamicLinks/createDynamicLinks';
import {useNavigation} from '@react-navigation/native';
import SocialBtnList from '../../components/common/SocialBtnList';

interface activityDetails {
  _id: string;
  activityData: data;
  activityName: string;
  distance: number;
  duration: number;
  finishedAt: number;
  immediatePoints: Array<cords>;
  startedAt: number;
  userId: string;
}

const RenderDistance: React.FC<any> = ({distance}) => {
  if (distance < 1) {
    return <Text style={styles.meterReading}>{distance * 1000} m</Text>;
  } else {
    <Text style={styles.meterReading}>{distance?.toFixed(2)} Km</Text>;
  }
};

const ViewActivity: React.FC<any> = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();
  const GenerateDynamicLinks = useGenerateDynamicLinks();
  const [url, setUrl] = useState('');
  const {userDetails} = useSelector((state: any) => state.user);
  const [activityDetails, setActivityDetails] =
    useState<null | activityDetails>(null);

  useEffect(() => {
    GetActivityByIdHandler();
    handleLinkGenration();
  }, []);

  const handleLinkGenration = async () => {
    const link = await GenerateDynamicLinks('activity', id);
    console.log('link', link);
    setUrl(link);
  };

  const GetActivityByIdHandler = async () => {
    try {
      const res = await GetActivityByIdService(id);
      const {data} = res.data;
      setActivityDetails(data);
    } catch (error: any) {
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };

  const getTimeFormat = (timer: number) => {
    var d = new Date(1000 * Math.round(timer / 1000)); // round to nearest second
    function pad(i: number) {
      return ('0' + i).slice(-2);
    }
    var str =
      d.getUTCHours() +
      ':' +
      pad(d.getUTCMinutes()) +
      ':' +
      pad(d.getUTCSeconds());
    return str;
  };

  const handleActivityActivity = () => {
    navigation.navigate('EditActivity' as never, {activityDetails} as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackBtn title="My activity" />
      {activityDetails ? (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.mainContainer}>
            <View style={styles.mapVideoContainer}>
              <FontAwesome size={40} name="play-circle" color="white" />
              <View style={styles.acitivityCard}>
                <View>
                  <Text style={styles.activityText}>
                    On {getMonthNameByIndex(activityDetails.startedAt)}{' '}
                    {getDayFromTimestamp(activityDetails.startedAt)},{' '}
                    {getYearFromTimeStamp(activityDetails.startedAt)} by
                  </Text>
                  <Text style={styles.userName}>{userDetails.name}</Text>
                </View>
                <View style={styles.line}></View>
                <View>
                  <Text style={styles.activityName}>
                    {activityDetails.activityName}
                  </Text>
                </View>
                <View style={styles.activityTypeMainContainer}>
                  <View style={styles.line}></View>
                  <View style={styles.activityTypeContainer}>
                    <Text style={styles.activityType}>
                      {activityDetails.activityData.activityName}
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <View style={styles.likeContainer}>
                    <Octicons name="heart" size={20} color="black" />
                    <Text style={styles.iconCount}>0</Text>
                  </View>
                  <View style={styles.commentContainer}>
                    <Octicons name="comment" size={20} color="black" />
                    <Text style={styles.iconCount}>0</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.shareContainer}>
                <Text style={styles.shareTextHeading}>Share your activity</Text>
                <View style={styles.btnContainer}>
                  <SocialBtnList url={url} />
                </View>
              </View>
              <View style={styles.MeterReadingContainer}>
                <View style={styles.readingContainer}>
                  <View style={styles.meterContainer}>
                    <Text style={styles.meterName}>Duration</Text>
                    <Text style={styles.meterReading}>
                      {getTimeFormat(activityDetails.duration)}
                    </Text>
                  </View>
                  <View style={styles.meterContainer}>
                    <Text style={styles.meterName}>Distance</Text>
                    <RenderDistance distance={activityDetails.distance} />
                  </View>
                  <View style={styles.meterContainer}>
                    <Text style={styles.meterName}>Speed (Km/h)</Text>
                    <Text style={styles.meterReading}>
                      {(
                        activityDetails.distance /
                        (activityDetails.duration / 3600000)
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              <ActivityMapPreview
                wayPoints={activityDetails.immediatePoints}
                startedAt={activityDetails.startedAt}
                finishedAt={activityDetails.finishedAt}
              />
              <View style={styles.mainBtnContainer}>
                <Button
                  style={styles.mainBtn}
                  mode="contained"
                  buttonColor={colorPrimary}
                  onPress={handleActivityActivity}>
                  <Text style={styles.mainBtnText}>Edit this activity</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text>Loading ....</Text>
      )}
    </SafeAreaView>
  );
};

export default ViewActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {},
  mainContainer: {},
  mapVideoContainer: {
    height: responsiveScreenHeight(30),
    backgroundColor: '#dddddd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  body: {},
  acitivityCard: {
    position: 'absolute',
    bottom: responsiveScreenHeight(-24),
    left: responsiveScreenWidth(18),
    backgroundColor: 'white',
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(2),
    width: responsiveScreenWidth(65),
    elevation: 8,
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(0.8),
  },
  userName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 0.7,
  },
  line: {
    borderWidth: 1,
    borderBottomColor: 'black',
    width: responsiveScreenWidth(45),
    marginVertical: responsiveScreenHeight(2),
  },
  activityName: {
    fontSize: responsiveFontSize(4),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityTypeMainContainer: {
    position: 'relative',
    marginTop: responsiveScreenHeight(1),
  },
  activityTypeContainer: {
    position: 'absolute',
    top: responsiveScreenHeight(-0.4),
    left: '20%',
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1),
    backgroundColor: 'white',
  },
  activityType: {
    fontSize: responsiveFontSize(2.5),
  },
  iconContainer: {
    paddingVertical: responsiveScreenHeight(2),
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveScreenWidth(5),
  },
  iconCount: {
    marginLeft: responsiveScreenWidth(2.5),
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
  },
  btn: {
    zIndex: 100,
    width: responsiveScreenWidth(50),
    paddingVertical: responsiveScreenHeight(0.5),
    marginTop: responsiveScreenHeight(1),
    backgroundColor: colorPrimary,
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
  shareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(30),
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
    paddingVertical: responsiveScreenHeight(1),
  },
  shareTextHeading: {
    fontSize: responsiveFontSize(2.4),
    color: 'black',
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(2.3),
    width: responsiveScreenWidth(72),
  },
  MeterReadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
    paddingVertical: responsiveScreenHeight(2),
  },
  meterContainer: {
    alignItems: 'center',
  },
  meterName: {
    fontSize: responsiveFontSize(1.7),
    color: '#bbbbbb',
    fontWeight: 'bold',
  },
  readingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveScreenWidth(80),
  },
  meterReading: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    marginTop: responsiveScreenHeight(0.5),
  },
  mainBtn: {
    width: responsiveScreenWidth(89),
    paddingVertical: responsiveScreenHeight(0.3),
  },
  mainBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(5),
  },
  mainBtnText: {
    fontSize: responsiveFontSize(1.9),
    letterSpacing: 0.8,
    fontWeight: '700',
  },
});
