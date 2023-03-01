import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { FC } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';

interface props {
  width?: number
}

const BezierLineChartMap: FC<props> = ({width}) => {
  return (
    <View>
      <LineChart
        data={{
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [
            {
              data: [0, 1],
            },
          ],
        }}
        width={responsiveScreenWidth(width ? width : 93)} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
        //   borderRadius: 16,
        }}
      />
    </View>
  );
};

export default BezierLineChartMap;

const styles = StyleSheet.create({});
