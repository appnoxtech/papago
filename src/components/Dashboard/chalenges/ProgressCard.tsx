import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, ProgressBar} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';

const ProgressCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeftContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../../../assets/images/Dashboard/progress.png')}
        />
      </View>
      <View style={styles.cardRightContainer}>
        <Text style={styles.cardTextHeading}>Let's reach the goal!</Text>
        <Text style={styles.cardSubText}>End of Feburary 11, 2023</Text>
        <ProgressBar
          style={styles.progressbar}
          progress={0.5}
          color={colorPrimary}
        />
        <Text style={styles.progressPercentage}>0%</Text>
      </View>
    </View>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  progressbar: {
    marginTop: responsiveScreenHeight(1),
    width: '85%',
    height: responsiveHeight(1.3),
    borderRadius: 10,
  },
  progressPercentage: {
    position: 'absolute',
    bottom: responsiveScreenHeight(-0.3),
    right: responsiveScreenWidth(3),
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  cardTextHeading: {
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: responsiveScreenHeight(0.5),
  },
  cardLeftContainer: {
    width: responsiveScreenWidth(25),
  },
  cardSubText: {
    fontSize: responsiveScreenFontSize(1.6),
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.3,
    marginBottom: responsiveScreenHeight(0.5),
  },
  cardRightContainer: {
    flex: 1,
    padding: 1,
  },
  btn: {
    paddingVertical: responsiveScreenHeight(0.6),
    width: '100%',
  },
  card: {
    position: 'relative',
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
});
