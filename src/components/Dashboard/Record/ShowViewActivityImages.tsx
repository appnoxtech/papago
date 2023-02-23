import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {parseMillisecondsIntoReadableTime} from '../../../utlis/common';
import {getDistance} from 'geolib';
import {cords} from '../../../interfaces/Dashboard/record.interface';

interface props {
  images: any;
  startingCords: cords;
}

const RenderDistance: React.FC<any> = ({distance}) => {
  if (distance < 1) {
    return <Text >{distance * 1000} m</Text>;
  } else {
    <Text>{distance?.toFixed(2)} Km</Text>;
  }
};

const ShowViewActivityImages: React.FC<props> = ({images, startingCords}) => {
  return (
    <View style={styles.mainContainer}>
      {images.map((imageItem: any, index: number) => {
        const [distance, setDistance] = useState(0);
        const calculateDistance = (endCords: cords) => {
          const watchDistance = getDistance(startingCords, endCords);
          const distance = watchDistance / 1000;
          console.log('watchDistance', watchDistance);
          setDistance(distance);
        };
        useEffect(() => {
          calculateDistance(imageItem.coordinate);
        }, []);
        return (
          <View style={styles.container} key={index}>
            <View style={styles.topContainer}>
              <View style={styles.verticalLine}></View>
            </View>
            <View style={styles.imageContainer}>
              <Image source={{uri: imageItem.image}} style={styles.image} />
            </View>
            <View style={styles.timeStampContainer}>
              <View style={styles.horizontalLine}></View>
              <Text style={styles.timeStampText}>
                Taken around{' '}
                {parseMillisecondsIntoReadableTime(imageItem.timestamp)} after{' '}
                <RenderDistance distance={distance} />
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ShowViewActivityImages;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: responsiveScreenHeight(6),
  },
  container: {
    width: '100%',
    marginTop: responsiveScreenHeight(5),
  },
  verticalLine: {
    height: responsiveScreenHeight(3),
    width: responsiveScreenWidth(1),
    backgroundColor: colorPrimary,
    position: 'absolute',
    bottom: responsiveScreenHeight(1),
    left: responsiveScreenWidth(8.3),
  },
  topContainer: {
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: responsiveScreenHeight(25),
  },
  image: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  timeStampContainer: {
    marginVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(12)
  },
  horizontalLine: {
    width: responsiveScreenWidth(30),
    borderTopWidth: 1,
    borderTopColor: 'black',
    marginBottom: responsiveScreenHeight(0.3)
  },
  timeStampText: {
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    marginTop: responsiveScreenHeight(0.5),
  }
});
