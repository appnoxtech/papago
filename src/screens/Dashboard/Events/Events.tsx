import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../../components/Dashboard/common/Headers';
import AnimatedLottieView from 'lottie-react-native';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import ChallengesCard from '../../../components/Dashboard/chalenges/ChallengesCard';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {addEventParams} from '../../../interfaces/reducers/PlanTripInterface';
import useGetEventListHook from '../../../hooks/Events/GetEventListHook';
import useGetInvitedEventListHook from '../../../hooks/Events/GetInvitedEventListHook';

const Events = () => {
  const navigation = useNavigation();
  const GetEventList = useGetEventListHook();
  const GetInvitedEventList = useGetInvitedEventListHook();
  const {eventList, invitedEventList, pendingInvitationEventList} = useSelector(
    (state: any) => state.Events,
  );
  const handleCreateActivity = () => {
    navigation.navigate('PlanTrip' as never);
  };

  useEffect(() => {
    GetEventList();
    GetInvitedEventList();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <Headers title="Events" />
      {eventList?.length || invitedEventList?.length ||  pendingInvitationEventList?.length? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.cardLeftContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require('../../../../assets/images/Dashboard/card1.png')}
              />
            </View>
            <View style={styles.cardRightContainer}>
              <Text style={styles.cardTextHeading}>
                Plan a fun Event for you and your friends
              </Text>
              <Button
                mode="contained"
                buttonColor={'#34b8ed'}
                style={styles.btn}
                onPress={handleCreateActivity}>
                Let's Go
              </Button>
            </View>
          </View>

          {/* List of Events created by user */}
          {eventList?.length ? (
            <View style={styles.listContainer}>
              <Text style={styles.textPrimary}>Your's Events</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.challengesListContainer}>
                {eventList.map((event: addEventParams) => (
                  <React.Fragment key={event._id}>
                    <ChallengesCard event={event} />
                  </React.Fragment>
                ))}
              </ScrollView>
            </View>
          ) : null}
          {/* End */}

          {/* List of Participtaed Event */}
          {invitedEventList?.length ? (
            <View style={styles.listContainer}>
              <Text style={styles.textPrimary}>Participated Events</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.challengesListContainer}>
                {invitedEventList.map((event: addEventParams) => (
                  <React.Fragment key={event._id}>
                    <ChallengesCard event={event} />
                  </React.Fragment>
                ))}
              </ScrollView>
            </View>
          ) : null}
          {/* End */}

          {/* List of Pending Invitation Events */}
          {pendingInvitationEventList?.length ? (
            <View style={styles.listContainer}>
              <Text style={styles.textPrimary}>Pending Invitation Events</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.challengesListContainer}>
                {pendingInvitationEventList.map((event: addEventParams) => (
                  <React.Fragment key={event._id}>
                    <ChallengesCard event={event} />
                  </React.Fragment>
                ))}
              </ScrollView>
            </View>
          ) : null}
          {/* End */}
        </ScrollView>
      ) : (
        <>
          <View style={styles.animationContainer}>
            <AnimatedLottieView
              style={styles.animation}
              source={require('../../../../assets/animations/RoadTrip.json')}
              autoPlay
              loop
            />
          </View>
          <View style={styles.bannerContainer}>
            <Text style={styles.banner}>Plan Trips with your Friends</Text>
            <View style={styles.subBannerContainer}>
              <Text style={styles.subBanner}>
                Create a fun Trips with your friends set goals and multiple
                stops.
              </Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              buttonColor={colorPrimary}
              style={styles.primaryBtn}
              onPress={handleCreateActivity}>
              <Text style={styles.primaryBtnText}>Let's Go</Text>
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'white'},
  container: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(3),
    height: '100%',
  },
  challengesInvitationContainer: {
    marginTop: responsiveScreenHeight(2),
  },
  progressContainer: {
    paddingHorizontal: responsiveScreenWidth(2),
  },
  progressCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(2),
  },
  textPrimary: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: 'black',
    marginBottom: responsiveScreenHeight(1),
  },
  listContainer: {
    marginVertical: responsiveScreenHeight(2),
  },
  headingContainer: {
    flexDirection: 'row',
    marginTop: responsiveScreenHeight(1),
    alignItems: 'flex-end',
  },
  progressText: {
    marginLeft: responsiveScreenWidth(1),
    fontSize: responsiveScreenFontSize(2.3),
    fontWeight: '700',
    color: 'black',
  },
  card: {
    width: responsiveScreenWidth(93),
    height: responsiveScreenHeight(15),
    paddingHorizontal: responsiveScreenWidth(1),
    paddingVertical: responsiveScreenHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: responsiveScreenWidth(2),
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardLeftContainer: {
    width: responsiveScreenWidth(25),
  },
  btn: {
    paddingVertical: responsiveScreenHeight(0.6),
    width: '100%',
  },
  challengesListContainer: {
    paddingHorizontal: responsiveScreenWidth(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRightContainer: {
    flex: 1,
    padding: 1,
  },
  cardTextHeading: {
    fontSize: responsiveScreenFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: responsiveScreenHeight(0.5),
  },
  animationContainer: {
    height: responsiveScreenHeight(30),
    marginVertical: responsiveScreenHeight(5),
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  banner: {
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: 'black',
  },
  subBannerContainer: {
    marginTop: responsiveScreenHeight(1),
    width: responsiveScreenWidth(59),
  },
  subBanner: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
    color: 'black',
    opacity: 0.5,
  },
  btnContainer: {
    marginTop: responsiveScreenHeight(5),
    marginBottom: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: {
    width: responsiveScreenWidth(90),
    paddingVertical: responsiveScreenHeight(0.5),
  },
  primaryBtnText: {
    fontSize: responsiveScreenFontSize(2),
  },
});
