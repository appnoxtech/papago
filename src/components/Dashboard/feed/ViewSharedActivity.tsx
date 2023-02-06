import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TripCard from './TripCard';

const ViewSharedActivity = () => {
  const [plannedList, setPlannedList] = useState([{}]);

  return (
    <View style={styles.container}>
      {plannedList.length > 0 ? (
        <View style={styles.listContainer}>
          <Text style={styles.textPrimary}>Joined Trips</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengesListContainer}>
            <TripCard />
            <TripCard />
          </ScrollView>
        </View>
      ) : (
        <View style={styles.noListView}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Welcome to Papa Go !</Text>
            <Text style={styles.subHeading}>
              Follow people to see their activities
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../../assets/images/Dashboard/newPanda.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ViewSharedActivity;

const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveScreenHeight(3),
  },
  challengesListContainer: {
    paddingHorizontal: responsiveScreenWidth(0.5),
  },
  textPrimary: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: responsiveScreenHeight(2),
    marginHorizontal: responsiveScreenWidth(3),
  },
  listContainer: {
    backgroundColor: 'white',
    paddingVertical: responsiveScreenHeight(3),
  },
  textContainer: {
    width: responsiveScreenWidth(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noListView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(30),
    marginTop: responsiveScreenHeight(3),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: responsiveScreenHeight(1),
  },
  subHeading: {
    fontSize: responsiveFontSize(2.7),
    fontWeight: '700',
    color: 'black',
    opacity: 0.7,
  },
});
