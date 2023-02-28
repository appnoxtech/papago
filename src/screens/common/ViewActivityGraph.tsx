import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderWithBackBtn from '../../components/common/Headers/HeaderWithBackBtn';
import {getDayFromTimestamp, getMonthString} from '../../utlis/common';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import StatsActivityCard from '../../components/common/cards/StatsActivityCard';
import MapGraphHeader from '../../components/common/Headers/MapGraphHeader';
import BezierLineChartMap from '../../components/maps/BezierLineChartMap';

const ViewActivityGraph: FC<any> = ({route}) => {
  const {activityDetails} = route.params;
  const navigation = useNavigation();

  // function run user clicks on the see stats of activty
  const handleViewActivityStatsClick = () => {
    navigation.navigate(
      'ViewActivityGraph' as never,
      {activityDetails} as never,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBackBtn
        title={`${getDayFromTimestamp(
          activityDetails.startedAt,
        )} ${getMonthString(activityDetails.startedAt)}`}
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <TouchableOpacity
          style={styles.viewStatsActivityContainer}
          onPress={handleViewActivityStatsClick}>
          <View style={styles.viewStatsLeftContainer}>
            <View style={styles.chartIconContainer}>
              <MaterialCommunityIcons
                name="chart-line"
                color={'black'}
                size={30}
              />
            </View>
            <Text style={styles.viewActivityText}>See all of your stats</Text>
          </View>
          <View style={styles.viewStatsRightContainer}>
            <Entypo name="chevron-right" color={'black'} size={25} />
          </View>
        </TouchableOpacity>
        <View style={styles.badgesContainer}>
          <StatsActivityCard title={'ACTIVE DAYS'} />
          <StatsActivityCard title={'STREAK'} />
        </View>
        <View style={styles.mapMainContainer}>
          <View style={styles.mapContainer}>
            <MapGraphHeader
              titles={['duration']}
              type="duration"
              readings={[activityDetails.duration]}
              total={'2'}
              scale={'Minutes'}
              bgColor="#797EF6"
            />
            <BezierLineChartMap />
          </View>
          <View style={styles.mapContainer}>
            <MapGraphHeader
              titles={['distance']}
              type="distance"
              readings={[activityDetails.distance]}
              total={'699'}
              scale={'Meter'}
              bgColor="#80cbc4"
            />
            <BezierLineChartMap />
          </View>
          <View style={styles.mapContainer}>
            <MapGraphHeader
              titles={["max speed", "Avg Speed"]}
              type={'speed'}
              readings={[40.2, 26.6]}
              total={'19.1'}
              scale={'km/h'}
              bgColor="#ee9f27"
            />
            <BezierLineChartMap />
          </View>
          <View style={styles.mapContainer}>
            <MapGraphHeader
              titles={["max elevation", "total elevation gain"]}
              type={'elevation'}
              readings={[130, 0]}
              total={'0'}
              scale={'m'}
              bgColor="#f96995"
            />
            <BezierLineChartMap />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewActivityGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewStatsActivityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(187, 187, 187, 0.5)',
  },
  viewStatsRightContainer: {},
  viewStatsLeftContainer: {
    flexDirection: 'row',
    width: responsiveScreenWidth(60),
    alignItems: 'center',
  },
  viewActivityText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.3,
  },
  chartIconContainer: {
    marginRight: responsiveScreenWidth(2.5),
  },
  badgesContainer: {
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
    flexDirection: 'row',
    gap: responsiveScreenWidth(4),
  },
  scrollContainer: {
    flex: 1,
  },
  mapMainContainer: {
    marginTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
  },
  mapContainer: {
    marginVertical: responsiveScreenHeight(2),
  },
});
