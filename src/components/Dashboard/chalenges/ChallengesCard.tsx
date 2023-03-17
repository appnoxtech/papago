import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, { FC } from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';

interface props {
  title?: string,
}
const ChallengesCard: FC<props> = ({title = 'Ride 100 km in 1 month'}) => {
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.image}
      resizeMode="cover"
      source={require('../../../../assets/images/Dashboard/mountain.jpeg')}>
      <View style={styles.body}>
        <Text style={styles.cardText}>{title}</Text>
        <Button
          mode="contained"
          buttonColor={'#34b8ed'}
          style={styles.btn}
          onPress={() => console.log('Hello')}>
          <Text style={styles.btnText}>View Event</Text>
        </Button>
      </View>
    </ImageBackground>
  );
};

export default ChallengesCard;

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(1.5),
  },
  cardText: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: responsiveScreenHeight(2),
  },
  btnText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    borderRadius: responsiveScreenWidth(3),
  },
  btn: {
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(50),
  },
  body: {
    width: responsiveScreenWidth(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
