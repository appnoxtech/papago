import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Avatar} from 'react-native-paper';
import {colorGrey, colorPrimary} from '../../../../assets/styles/GlobalTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TripCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.primaryText}>Climb Mount Everest</Text>
      </View>
      <View style={styles.body}>
        <MaterialCommunityIcons name='progress-clock' size={17} />
        <Text style={styles.date}>09 Jan 2023 - 02 Feb 2023</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.avatarContainer}>
          <Avatar.Text size={20} label="p" />
        </View>
        <View>
          <Text style={styles.footerText}>2.8k participants</Text>
        </View>
      </View>
      <FontAwesome style={styles.share} name='share-alt' size={23} />
    </View>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: responsiveScreenWidth(75),
    height: responsiveScreenHeight(18),
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(2),
    borderWidth: 1,
    borderColor: colorGrey,
    marginHorizontal: responsiveScreenWidth(1.5),
    borderRadius: 10,
  },
  share: {
    position: 'absolute',
    top: responsiveScreenHeight(2),
    right: responsiveScreenWidth(3),
    color: colorPrimary,
  },
  footerText: {
    fontSize: responsiveFontSize(2),
  },
  headContainer: {
    marginBottom: responsiveScreenHeight(2),
  },
  primaryText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: 'black',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginHorizontal: responsiveScreenWidth(1.2),
    fontSize: responsiveFontSize(1.8),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: responsiveScreenHeight(5),
  },
  avatarContainer: {
    marginRight: responsiveScreenWidth(2),
  },
});
