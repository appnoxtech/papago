import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {actvityCommentDetails} from '../../../interfaces/Dashboard/record.interface';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Avatar} from 'react-native-paper';

interface props {
  item: actvityCommentDetails;
}

const CommentCard: React.FC<props> = ({item}) => {
  return (
    <View style={styles.commentPreviewContainer}>
      <Avatar.Text size={33} label="SC" />
      <View style={styles.rightContainer}>
        <Text style={styles.userName}>
          {item.name}
        </Text>
        <Text style={styles.message}>
          {item.message}
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  commentPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: responsiveScreenHeight(1.7),
  },
  rightContainer: {
    marginLeft: responsiveScreenWidth(2),
  },
  userName: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  message: {
    marginTop: responsiveScreenHeight(0.5),
    fontSize: responsiveFontSize(1.7),
    fontWeight: 400,
  },
});
