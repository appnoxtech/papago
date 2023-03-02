import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import LoadIcon from '../common/LoadIcon';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';
import BezierLineChartMap from '../maps/BezierLineChartMap';

interface props {
  iconFamiy: string;
  iconName: string;
  label: string;
  alaisTimeFrame: string;
  totalValue: number;
  totalScale: string;
  avgValue: number;
  avgScale: string;
  isHide: boolean;
}

const StatsGraphContainer: FC<props> = ({
  iconFamiy,
  iconName,
  label,
  alaisTimeFrame,
  totalValue,
  totalScale,
  avgValue,
  avgScale,
  isHide,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View>
          <LoadIcon
            iconFamily={iconFamiy}
            iconName={iconName}
            size={35}
            color={'black'}
            style={{}}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
      <View style={styles.graphSectionContainer}>
        <View style={styles.graphSectionHeader}>
          <Text style={styles.graphTextPrimary}>Total</Text>
          {!isHide ? (
            <View style={styles.aliasContainer}>
              <View style={styles.aliasItemContainer}>
                <View
                  style={[
                    styles.circle,
                    {backgroundColor: colorPrimary},
                  ]}></View>
                <Text
                  style={
                    styles.aliasItemText
                  }>{`Previous ${alaisTimeFrame}`}</Text>
              </View>
              <View style={styles.aliasItemContainer}>
                <View
                  style={[
                    styles.circle,
                    {backgroundColor: colorPrimary},
                  ]}></View>
                <Text
                  style={styles.aliasItemText}>{`This ${alaisTimeFrame}`}</Text>
              </View>
              <View style={styles.aliasItemContainer}>
                <Text style={[styles.aliasLineBreak]}>- - -</Text>
                <Text style={styles.aliasItemText}>{`Average`}</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={styles.graphSectionBody}>
          <BezierLineChartMap width={88} />
        </View>
        <View style={styles.graphSectionFooter}>
          <View style={styles.meterValueSummaryContainer}>
            <View style={styles.meterContainer}>
              <Text
                style={styles.meterValue}>{`${totalValue} ${totalScale}`}</Text>
              <Text style={styles.meterScale}>Total</Text>
            </View>
            {!isHide ? (
              <View>
                <Text
                  style={styles.meterValue}>{`${avgValue} ${avgScale}`}</Text>
                <Text style={styles.meterScale}>Average per day</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.shareIconContainer}>
            <LoadIcon
              style={{}}
              iconFamily={'MaterialCommunityIcons'}
              iconName={'share-outline'}
              color={'grey'}
              size={25}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatsGraphContainer;

const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveScreenHeight(3),
    paddingBottom: responsiveScreenHeight(4),
    paddingHorizontal: responsiveScreenWidth(3),
    borderBottomWidth: 3,
    borderBottomColor: '#eeeeee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  label: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black',
  },
  labelContainer: {
    marginLeft: responsiveScreenWidth(2),
  },
  graphSectionContainer: {
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    paddingVertical: responsiveScreenHeight(1.5),
    paddingHorizontal: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveScreenWidth(93),
  },
  graphSectionHeader: {
    width: '100%',
    paddingHorizontal: responsiveScreenWidth(3),
  },
  graphTextPrimary: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    color: 'black',
  },
  aliasContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(1),
    justifyContent: 'space-between',
    marginTop: responsiveScreenHeight(1.5),
  },
  aliasItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: responsiveScreenWidth(2.4),
    height: responsiveScreenWidth(2.4),
    borderRadius: responsiveScreenWidth(1.2),
    marginRight: responsiveScreenWidth(1),
  },
  aliasItemText: {
    color: 'rgba(0,0,0, 0.6)',
    fontSize: responsiveFontSize(1.6),
  },
  aliasLineBreak: {
    marginRight: responsiveScreenWidth(1),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  graphSectionBody: {
    marginTop: responsiveScreenHeight(1),
  },
  graphSectionFooter: {
    width: '100%',
    paddingHorizontal: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meterValueSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveScreenWidth(45),
  },
  shareIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  meterValue: {
    fontSize: responsiveFontSize(2.7),
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.8,
  },
  meterScale: {
    fontSize: responsiveFontSize(1.7),
    color: 'rgba(0,0,0,0.5)',
  },
  meterContainer: {
    alignItems: 'center',
  },
});
