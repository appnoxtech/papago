import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../../components/Dashboard/common/Headers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import ChallengesCard from '../../components/Dashboard/chalenges/ChallengesCard';
import ProgressCard from '../../components/Dashboard/chalenges/ProgressCard';

const Challenges = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Headers title="Challenges" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardLeftContainer}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../../assets/images/Dashboard/card1.png')}
            />
          </View>
          <View style={styles.cardRightContainer}>
            <Text style={styles.cardTextHeading}>
              Build a fun challenge for you and your friends
            </Text>
            <Button
              mode="contained"
              buttonColor={'#34b8ed'}
              style={styles.btn}
              onPress={() => console.log('heelo')}>
              Let's Go
            </Button>
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.textPrimary}>Challenge a friend</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengesListContainer}>
            <ChallengesCard />
            <ChallengesCard />
            <ChallengesCard />
            <ChallengesCard />
          </ScrollView>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.headingContainer}>
            <Ionicons color={'black'} size={25} name="bar-chart-sharp" />
            <Text style={styles.progressText}>See your progress</Text>
          </View>
          <View style={styles.progressCardContainer}>
            <ProgressCard />
          </View>
        </View>
        <View style={styles.challengesInvitationContainer}>
          <View style={styles.headingContainer}>
            <Feather color={'black'} size={25} name="target" />
            <Text style={styles.progressText}>JOIN A CHALLENGE</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Challenges;

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
});
