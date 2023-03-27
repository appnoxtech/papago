import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Avatar, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assets/styles/GlobalTheme';
import {friend} from '../../../interfaces/Dashboard/friend.interface';
import {SendEventTripInvitationService} from '../../../services/Dashboard/events.service';
import useHandleError from '../../../hooks/common/handelError';

interface props {
  item: friend;
  pressHandler(id: string): void;
}

const FriendCard: FC<props> = ({item, pressHandler}) => {
  const {selectedEvent} = useSelector((state: any) => state.Events);
  const isFound = selectedEvent?.sharedWith?.findIndex(
    (user: {isAccepted: boolean; sharedWithId: string}) =>
      user.sharedWithId === item._id,
  );
  
  return (
    <View style={styles.friendCard}>
      <View style={styles.profileContainer}>
        <Avatar.Text color="white" style={styles.avatar} size={38} label="SC" />
        <Text style={styles.userName}>{item.userName}</Text>
      </View>
      <View style={styles.btnContainer}>
        {isFound === -1 || isFound === undefined ? (
          <Button
            onPress={() => pressHandler(item._id)}
            mode="contained"
            buttonColor={colorPrimary}
            style={styles.btn}>
            <Text style={styles.btnText}>Invite</Text>
          </Button>
        ) : (
          <View style={styles.btnPendingContainer}>
             <Text style={styles.pendingBtnText}>Pending</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const FriendList = () => {
  const {friendList} = useSelector((state: any) => state.user);
  const {selectedEvent} = useSelector((state: any) => state.Events);
  const handleError = useHandleError();

  const pressHandler = async (id: string) => {
    try {
      const data = {
        friendId: id,
        tripId: selectedEvent._id,
      };
      await SendEventTripInvitationService(data);
      Alert.alert('Notification', 'Invitation Sent');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {friendList?.map((item: friend) => (
        <React.Fragment key={item._id}>
          <FriendCard item={item} pressHandler={pressHandler} />
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

export default FriendList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: responsiveScreenHeight(1),
  },
  friendCard: {
    paddingHorizontal: responsiveScreenWidth(1),
    paddingVertical: responsiveScreenHeight(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(1),
  },
  profileContainer: {
    width: responsiveScreenWidth(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: responsiveScreenWidth(2),
    backgroundColor: colorSecondary,
  },
  userName: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '600',
    color: 'black',
    opacity: 0.9,
  },
  btnContainer: {},
  btn: {
    width: responsiveScreenWidth(23),
    paddingHorizontal: 0,
    marginHorizontal: 0
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  pendingBtnText: {
    fontSize: responsiveFontSize(1.8),
    color: 'grey',
    opacity: 0.5
  },
  btnPendingContainer: {
    width: responsiveScreenWidth(23),
    paddingVertical: responsiveScreenHeight(1.1),
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: responsiveScreenWidth(5),
    justifyContent:'center',
    alignItems: 'center'
  }
});
