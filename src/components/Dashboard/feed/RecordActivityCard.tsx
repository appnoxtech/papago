import {LogBox, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Avatar, Button, IconButton} from 'react-native-paper';
import {getUserDataFromLocalStorage} from '../../../utlis/auth';
import {user} from '../../../interfaces/auth/authInterface';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assets/styles/GlobalTheme';

const RecordActivityCard: React.FC<any> = ({userDetails, id, acitivity}) => {
//   console.log('acitivity', acitivity)
  return (
    <View style={styles.container} key={id}>
      <View style={styles.head}>
        <Avatar.Text size={33} label="SC" />
        <View style={styles.headUserDetails}>
          <Text style={styles.headText}>{userDetails.name}</Text>
          <Text style={styles.headSubText}>Today at 10:26 AM</Text>
        </View>
      </View>
      <View style={styles.shareContainer}>
        <View style={styles.shareContainerLeft}>
          <Text style={styles.shareContainerLeftText}>
            {`Hey ${userDetails.name}, you didn't share this video yet!`}
          </Text>
        </View>
        <View>
          <Button
            style={styles.btn}
            mode="contained"
            buttonColor={colorPrimary}>
            <Text style={styles.btnText}>Share</Text>
          </Button>
        </View>
      </View>
      <View style={styles.activtyCard}>
        <View style={styles.activitySummary}>
          <Text style={styles.activitySummaryText}>{acitivity.activityName}</Text>
        </View>
      </View>
      <View style={styles.btnsContainer}>
        <IconButton
          icon="heart-outline"
          iconColor={'black'}
          size={25}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="comment-outline"
          iconColor={'black'}
          size={25}
          onPress={() => console.log('Pressed')}
        />
      </View>
      <View style={styles.footer}>
        <Avatar.Text size={33} label="SC" />
        <TextInput
          style={styles.commentInput}
          placeholder="Add a Comment"
        />
        <Button>
            <Text style={styles.cmntBtnText}>Post</Text>
        </Button>
      </View>
    </View>
  );
};

export default RecordActivityCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1),
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    marginBottom: responsiveScreenHeight(1),
    width: '100%',
  },
  headUserDetails: {
    marginLeft: responsiveScreenWidth(3),
  },
  headText: {
    fontSize: responsiveFontSize(1.7),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: responsiveScreenHeight(0.5),
  },
  headSubText: {
    fontSize: responsiveFontSize(1.3),
    color: 'grey',
    fontWeight: '700',
  },
  shareContainer: {
    marginTop: responsiveScreenHeight(1.5),
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1),
    backgroundColor: '#dddddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
  },
  shareContainerLeft: {
    width: responsiveScreenWidth(60),
  },
  shareContainerLeftText: {
    fontSize: responsiveFontSize(1.5),
    color: 'grey',
    opacity: 0.9,
  },
  btn: {
    width: responsiveScreenWidth(25),
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
  },
  activtyCard: {
    marginTop: responsiveScreenHeight(2),
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(20),
    backgroundColor: colorSecondary,
    borderRadius: 5,
    position: 'relative',
  },
  activitySummary: {
    position: 'absolute',
    bottom: 11,
    left: 11,
  },
  activitySummaryText: {
    fontSize: responsiveFontSize(2.7),
    fontWeight: 'bold',
    color: 'black',
  },
  btnsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  footer: {
    marginTop: responsiveScreenHeight(1),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  commentInput: {
    width: responsiveScreenWidth(60),
    borderColor: '#bbbbbb',
    borderWidth: 1,
    paddingHorizontal: responsiveScreenWidth(1),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: 10,
  },
  cmntBtnText: {
    color: 'grey'
  }
});
