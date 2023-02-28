import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import {getTimeFormat} from '../../../utlis/common';

interface props {
  titles: Array<string>;
  readings: Array<number>;
  total: string;
  bgColor: string;
  scale: string;
  type: string;
}

const MapGraphHeader: FC<props> = ({
  type,
  titles,
  readings,
  total,
  scale,
  bgColor,
}) => {
  const year = new Date().getUTCFullYear();
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {titles.map((title: string, index: number) => {
          return (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.title}>{title}</Text>
              {type === 'duration' ? (
                <Text style={styles.reading}>{getTimeFormat(readings[index])}</Text>
              ) : type === 'distance' ? (
                <Text style={styles.reading}>
                  {readings[index] < 1
                    ? `${readings[index] * 1000} m`
                    : `${readings[index].toFixed(2)} Km`}
                </Text>
              ) : type === 'speed' ? (
                <Text style={styles.reading}>{`${readings[index]} km/h`}</Text>
              ) : type === 'elevation' ? (
                <Text style={styles.reading}>{`${readings[index]} m`}</Text>
              ) : null}
            </View>
          );
        })}

        <View style={[styles.yearStatsSummary, {backgroundColor: bgColor}]}>
          <Text
            style={
              styles.yearStatsSummaryText
            }>{`${total} ${scale} in ${year}`}</Text>
        </View>
      </View>
      <View>
        <Button mode="outlined">
          <Text>Share</Text>
        </Button>
      </View>
    </View>
  );
};

export default MapGraphHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveScreenHeight(3),
    paddingHorizontal: responsiveScreenWidth(1),
  },
  leftContainer: {
    width: responsiveScreenWidth(50),
  },
  title: {
    fontSize: responsiveFontSize(2),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'rgba(187, 187, 187, 0.7)',
  },
  reading: {
    fontSize: responsiveFontSize(5),
    color: 'black',
    fontWeight: 'bold',
  },
  yearStatsSummary: {
    paddingVertical: responsiveScreenHeight(0.1),
    paddingHorizontal: responsiveScreenWidth(1.5),
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
  yearStatsSummaryText: {
    fontSize: responsiveFontSize(1.9),
    letterSpacing: 0.6,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  headerTitleContainer: {
    marginBottom: responsiveScreenHeight(1)
  }
});
