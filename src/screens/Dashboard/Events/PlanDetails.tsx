import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderWithBackBtn from '../../../components/common/Headers/HeaderWithBackBtn';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button, Divider} from 'react-native-paper';
import LoadIcon from '../../../components/common/LoadIcon';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {timestampToLocaleDateConverterFunction} from '../../../utlis/common';

const PlanDetails = () => {
  const Navigation = useNavigation();
  const {startingAt, endingAt, title, description, isPrivate, selectedActivity, startingCords, endingCords, stops, distance } = useSelector(
    (state: any) => state.planTrip,
  );
  const handleTripDate = () => {
    Navigation.navigate('SelectTripDate' as never);
  };

  const handlePublicPrivateEvent = () => {
    Navigation.navigate('PublicPrivateEvent' as never);
  };

  const handleTripTitleUpdate = () => {
    Navigation.navigate('PlanTripTitleDescription' as never);
  };

  const handlePress = () => {
    const data = {
      startingAt,
      endingAt,
      title,
      description,
      startingCords,
      endingCords,
      stops,
      distance,
      selectedActivity,
    }

    console.log('Data', data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackBtn title={'Trip Details'} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Description of the Trip.</Text>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionItem}>
              <View style={styles.sectionItemHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.rightContainer}>
                  <TouchableOpacity onPress={handleTripTitleUpdate}>
                    <LoadIcon
                      iconFamily="MaterialIcons"
                      iconName="edit"
                      color={colorPrimary}
                      style={{}}
                      size={26}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={[
              styles.sectionContainer,
              {marginVertical: responsiveScreenHeight(0)},
            ]}>
            <View style={styles.sectionItem}>
              <View style={styles.leftSection}>
                <View
                  style={[styles.iconContainer, {backgroundColor: 'yellow'}]}>
                  <LoadIcon
                    iconFamily="Feather"
                    iconName="clock"
                    color="black"
                    style={{}}
                    size={25}
                  />
                </View>
              </View>
              <View style={[styles.middleSection, styles.dateContainer]}>
                <View style={styles.dateItemContainer}>
                  <Text style={styles.challengeTitle}>START DATE</Text>
                  <Text style={styles.challengActivityText}>
                    {timestampToLocaleDateConverterFunction(
                      startingAt,
                      'dd/mm/yyyy',
                    )}
                  </Text>
                </View>
                <View style={styles.dateItemContainer}>
                  <Text style={[styles.challengeTitle, {textAlign: 'right'}]}>
                    END DATE
                  </Text>
                  <Text
                    style={[styles.challengActivityText, {textAlign: 'right'}]}>
                    {timestampToLocaleDateConverterFunction(
                      endingAt,
                      'dd/mm/yyyy',
                    )}
                  </Text>
                </View>
              </View>
              <View style={styles.rightContainer}>
                <TouchableOpacity onPress={handleTripDate}>
                  <LoadIcon
                    iconFamily="MaterialIcons"
                    iconName="edit"
                    color={colorPrimary}
                    style={{}}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.section, {marginTop: responsiveScreenHeight(5)}]}>
          <Text style={styles.sectionHeading}>Who can join?</Text>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionItem}>
              <View style={styles.leftSection}>
                <View
                  style={[styles.iconContainer, {backgroundColor: 'yellow'}]}>
                  <LoadIcon
                    iconFamily="MaterialCommunityIcons"
                    iconName="lock-outline"
                    color="black"
                    style={{}}
                    size={30}
                  />
                </View>
              </View>
              <View style={[styles.middleSection]}>
                <Text style={styles.challengeTitle}>
                  {isPrivate ? 'PRIVATE' : 'PUBLIC'}
                </Text>
                <View style={{marginTop: 5}}>
                  <Text style={styles.challengActivityText}>
                    {isPrivate
                      ? 'Only people who are directly invited will be able to to see and join this event.'
                      : 'All Papa Go users will be able to see and join this trip from the Event Page Section.'}
                  </Text>
                </View>
              </View>
              <View style={styles.rightContainer}>
                <TouchableOpacity onPress={handlePublicPrivateEvent}>
                  <LoadIcon
                    iconFamily="MaterialIcons"
                    iconName="edit"
                    color={colorPrimary}
                    style={{}}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button onPress={handlePress} mode="contained" buttonColor={colorPrimary} style={styles.btn}>
          <Text>Done!</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PlanDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  section: {
    paddingVertical: responsiveScreenHeight(1),
  },
  sectionHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: 'black',
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: responsiveScreenWidth(3),
    marginVertical: responsiveScreenHeight(2),
  },
  sectionItem: {
    marginVertical: responsiveScreenHeight(2),
    marginHorizontal: responsiveScreenWidth(3.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  divider: {},
  iconContainer: {
    width: responsiveScreenWidth(7),
    height: responsiveScreenWidth(7),
    marginVertical: responsiveScreenHeight(0.5),
    borderRadius: responsiveScreenWidth(3.5),
    backgroundColor: '#03C04A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveScreenWidth(2),
  },
  challengeTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
  },
  challengeActivityContainer: {
    marginVertical: responsiveScreenHeight(0.5),
  },
  challengActivityText: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    opacity: 0.5,
  },
  leftSection: {
    width: '10%',
  },
  middleSection: {
    width: '80%',
    paddingTop: responsiveScreenHeight(0.6),
    paddingHorizontal: responsiveScreenWidth(2),
  },
  rightContainer: {
    width: '10%',
    paddingTop: responsiveScreenHeight(0.4),
  },
  dateContainer: {
    paddingRight: responsiveScreenWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateItemContainer: {
    flex: 1,
  },
  sectionItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    width: '90%',
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 30,
  },
  description: {
    fontSize: responsiveFontSize(1.9),
    opacity: 0.7,
  },
  footer: {
    paddingTop: responsiveScreenHeight(2),
    paddingBottom: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: responsiveScreenWidth(90),
    paddingVertical: responsiveScreenHeight(0.4),
  },
});
