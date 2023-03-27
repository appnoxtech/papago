import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import EventDetailsHeader from '../../../components/Dashboard/chalenges/EventDetailsHeader';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LoadIcon from '../../../components/common/LoadIcon';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Button} from 'react-native-paper';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import useGetFriendListHook from '../../../hooks/common/GetFriendListHook';
import { AcceptEventTripInvitationService } from '../../../services/Dashboard/events.service';
import { UpdateSelectedEvent } from '../../../redux/reducers/events.reducer';
import useHandleError from '../../../hooks/common/handelError';
import useGetInvitedEventListHook from '../../../hooks/Events/GetInvitedEventListHook';

const EventDetails: FC<any> = ({route}) => {
  const dispatch = useDispatch();
  const GetInvitedEventList = useGetInvitedEventListHook();
  const Navigation = useNavigation();
  const getFriendList = useGetFriendListHook();
  const handleError = useHandleError();
  const {selectedEvent} = useSelector((state: any) => state.Events);
  const [isActive, setIsActive] = useState(true);

  const handelToggel = () => {
    setIsActive(!isActive);
  };

  const handleInviteBtnClick = () => {
    Navigation.navigate('InviteFriend' as never);
  };

  useEffect(() => {
    getFriendList();
  }, []);

  const handleAcceptInvitation = async() => {
    try {
      const data = {
        tripId: selectedEvent?._id
      }
      await AcceptEventTripInvitationService(data);
      await GetInvitedEventList();
      Alert.alert('Notification', 'You have joined this Event.');
      dispatch(UpdateSelectedEvent({
        ...selectedEvent,
        isAccepted: true,
      }));
    } catch (error) {
      console.log('error', error);
       handleError(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <EventDetailsHeader title="Event Details" />
      <View style={styles.body}>
        <View style={[styles.sections, styles.header]}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../../../assets/images/Dashboard/progress.png')}
            />
          </View>
          <View style={styles.textPrimaryContainer}>
            <Text style={styles.textPrimary}>{selectedEvent.eventTitle}</Text>
            <Text style={styles.textSecondary}>
              {selectedEvent.eventDescription}
            </Text>
          </View>
        </View>
        <View style={styles.sections}>
          <Pressable onPress={handelToggel}>
            <View style={styles.toggelContainer}>
              <View style={styles.toggleLeftViewContainer}>
                <View style={styles.toggleImgContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.img}
                    source={require('../../../../assets/images/Dashboard/bullseye.jpeg')}
                  />
                </View>
                <Text style={styles.toggleBtnText}>Challenge Info</Text>
              </View>
              <View style={styles.toggleRightViewContainer}>
                <LoadIcon
                  iconFamily="Entypo"
                  iconName={isActive ? 'chevron-thin-up' : 'chevron-thin-down'}
                  size={22}
                  color={'black'}
                  style={{}}
                />
              </View>
            </View>
          </Pressable>
          {isActive ? (
            <View style={styles.toggleContainer}>
              <View style={styles.toggleSection}>
                <View style={styles.iconContainer}>
                  <LoadIcon
                    iconFamily="MaterialCommunityIcons"
                    iconName="arrow-expand"
                    color="black"
                    style={{}}
                    size={20}
                  />
                </View>
                <Text style={styles.iconText}>Record 100 kilometer</Text>
              </View>
              <View style={styles.toggleSection}>
                <View
                  style={[styles.iconContainer, {backgroundColor: 'white'}]}>
                  <LoadIcon
                    iconFamily="Feather"
                    iconName="calendar"
                    color="black"
                    style={{}}
                    size={24}
                  />
                </View>
                <Text style={styles.iconText}>20 Mar 2023 - 8 Apr 2023</Text>
              </View>
              <View style={styles.toggleSection}>
                <View
                  style={[styles.iconContainer, {backgroundColor: 'white'}]}>
                  <LoadIcon
                    iconFamily="Ionicons"
                    iconName="flash-outline"
                    color="black"
                    style={{}}
                    size={24}
                  />
                </View>
                <Text style={styles.iconText}>Record 100 kilometer</Text>
              </View>
              <View
                style={[
                  styles.toggleSection,
                  {marginTop: responsiveScreenHeight(0.7)},
                ]}>
                <View
                  style={[styles.iconContainer, {backgroundColor: 'white'}]}>
                  <Avatar.Text size={27} label="SC" />
                </View>
                <Text style={[styles.iconText]}>{`CREATED BY ${
                  selectedEvent?.userData
                    ? selectedEvent?.userData?.name
                    : selectedEvent?.ownerOfTrip?.name
                }`}</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={[styles.sections, styles.btnContainer]}>
          {selectedEvent?.userData ? (
            <Button
              mode="contained"
              buttonColor={colorPrimary}
              style={styles.btn}
              onPress={handleInviteBtnClick}>
              <Text style={styles.btnText}>Invite friends</Text>
            </Button>
          ) : selectedEvent?.isAccepted ? null : (
            <Button
              mode="contained"
              buttonColor={colorPrimary}
              style={styles.btn}
              onPress={handleAcceptInvitation}>
              <Text style={styles.btnText}>Accept Invitation</Text>
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sections: {
    borderWidth: 1,
    borderColor: '#eeeeee',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1.5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  body: {
    flex: 1,
  },
  imgContainer: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenWidth(20),
  },
  img: {
    width: '100%',
    height: '100%',
  },
  textPrimaryContainer: {
    flex: 1,
    paddingLeft: responsiveScreenWidth(3),
  },
  textPrimary: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.3,
    lineHeight: 35,
  },
  textSecondary: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: 'black',
    letterSpacing: 0.3,
  },
  toggelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLeftViewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleBtnText: {
    fontSize: responsiveFontSize(2),
    textTransform: 'uppercase',
    fontWeight: '500',
    color: 'black',
  },
  toggleRightViewContainer: {
    width: responsiveScreenWidth(10),
  },
  toggleImgContainer: {
    width: responsiveScreenWidth(8),
    height: responsiveScreenWidth(8),
  },
  toggleContainer: {
    marginTop: responsiveScreenHeight(1.3),
    paddingHorizontal: responsiveScreenWidth(2),
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconContainer: {
    width: responsiveScreenWidth(6),
    height: responsiveScreenWidth(6),
    marginVertical: responsiveScreenHeight(0.5),
    borderRadius: responsiveScreenWidth(3),
    backgroundColor: '#03C04A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveScreenWidth(2),
  },
  iconText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500',
    opacity: 0.5,
    lineHeight: 32,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveScreenHeight(2),
  },
  btn: {
    width: responsiveScreenWidth(90),
    paddingVertical: 0.3,
  },
  btnText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '700',
  },
});
