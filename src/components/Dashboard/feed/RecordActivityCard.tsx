import {
  LogBox,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Avatar, Button, IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assets/styles/GlobalTheme';
import {
  activityDetails,
  actvityCommentDetails,
  actvityLikeCommentDetails,
  actvityLikeDetails,
  data,
} from '../../../interfaces/Dashboard/record.interface';
import {useNavigation} from '@react-navigation/native';
import {parseMillisecondsIntoReadableTime} from '../../../utlis/common';
import Share from 'react-native-share';
import useGenerateDynamicLinks from '../../../hooks/dynamicLinks/createDynamicLinks';
import {
  GetActivityByIdService,
  GetRecordLikeAndCommentDetails,
  LikeRecordActivityService,
} from '../../../services/Dashboard/record.service';
import useHandleError from '../../../hooks/common/handelError';
import CommentModal from '../../../screens/common/CommentModal';

interface params {
  Activity: data;
}

const RenderActivityIcon = ({Activity}: params) => {
  console.log('Activity', Activity);
  if (Activity.iconFamily === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        size={25}
        name={Activity.iconName}
        color={colorSecondary}
      />
    );
  } else if (Activity.iconFamily === 'FontAwesome5') {
    return (
      <FontAwesome5 size={25} name={Activity.iconName} color={colorSecondary} />
    );
  } else {
    return (
      <Ionicons size={25} name={Activity.iconName} color={colorSecondary} />
    );
  }
};

const RenderDistance: React.FC<any> = ({distance}) => {
  if (distance < 1) {
    return <Text style={styles.activityDistanceText}>{distance * 1000} m</Text>;
  } else {
    <Text style={styles.activityDistanceText}>{distance?.toFixed(2)} Km</Text>;
  }
};

const RecordActivityCard: React.FC<any> = ({userDetails, id, acitivity}) => {
  const navigation = useNavigation();
  const handleError = useHandleError();
  const inputRef = useRef(null);
  const [url, setUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activityDetails, setActivityDetails] =
    useState<null | activityDetails>(null);
  const [commentList, setCommentList] =
    useState<Array<actvityCommentDetails> | null>(null);
  const [likeList, setLikeList] = useState<Array<actvityLikeDetails> | null>(
    null,
  );
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState<0 | 1>(0);
  const GenrateDynamicLinks = useGenerateDynamicLinks();

  const handleCardPress = () => {
    navigation.navigate('ViewActivity' as never, {id: acitivity._id} as never);
  };

  const handleLinkGenration = async () => {
    const link = await GenrateDynamicLinks('activity', acitivity._id);
    setUrl(link);
  };

  const handleShareBtnPress = () => {
    const options = {
      url: url,
      message: 'Teting',
    };
    Share.open(options);
  };

  const handleLikeActivityService = async () => {
    try {
      const data = {
        activityId: acitivity._id as string,
        like: activityDetails?.isLiked ? 0 : (1 as 0 | 1),
      };
      console.log('data', data);
      await LikeRecordActivityService(data);
      setIsLiked(isLiked === 0 ? 1 : 0);
      Alert.alert('Notification', 'Liked');
      GetActivityByIdHandler();
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleCommentActivityService = async () => {
    try {
      const data = {
        activityId: acitivity._id as string,
        message: comment,
      };
      console.log('data', data);
      await LikeRecordActivityService(data);
      Alert.alert('Notification', 'Comment');
      setComment('');
      handleGetActivityLikeAndCommentDetails();
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleGetActivityLikeAndCommentDetails = async () => {
    try {
      const res = await GetRecordLikeAndCommentDetails(acitivity._id);
      const {commentData, likeData} = res.data.data;
      console.log('commentData', commentData);
      console.log('likeData', likeData);
      
      if (commentData.length) {
        setCommentList([...commentData]);
      }
      if (likeData.length) {
        setLikeList([...likeData]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const commentClickHandler = () => {
    //@ts-ignore
    inputRef.current.focus();
  };

  useEffect(() => {
    handleLinkGenration();
    handleGetActivityLikeAndCommentDetails();
    GetActivityByIdHandler();
  }, []);

  const GetActivityByIdHandler = async () => {
    try {
      const res = await GetActivityByIdService(acitivity._id);
      const {data} = res.data;
      setActivityDetails(data);
    } catch (error: any) {
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };

  //console.log('activityDetails', activityDetails);
  // console.log('acitivity', acitivity);
  // console.log('commentList', commentList);

  return (
    <View style={styles.container} key={id}>
      <View style={styles.head}>
        <Avatar.Text size={33} label="SC" />
        <View style={styles.headUserDetails}>
          <Text style={styles.headText}>{acitivity.name}</Text>
          <Text style={styles.headSubText}>
            Today at {parseMillisecondsIntoReadableTime(acitivity.startedAt)}
          </Text>
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
            buttonColor={colorPrimary}
            onPress={handleShareBtnPress}>
            <Text style={styles.btnText}>Share</Text>
          </Button>
        </View>
      </View>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.activtyCard}>
          <View style={styles.activitySummary}>
            <View style={styles.activitySummaryContainer}>
              <View style={styles.activityIconContainer}>
                <RenderActivityIcon Activity={acitivity.activityData} />
              </View>
              <View style={styles.activityDistanceTextContainer}>
                <RenderDistance distance={acitivity.distance} />
              </View>
            </View>
            <Text style={styles.activitySummaryText}>
              {acitivity.activityName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.btnsContainer}>
        <IconButton
          icon={activityDetails?.isLiked ? 'heart' : 'heart-outline'}
          iconColor={activityDetails?.isLiked ? colorPrimary : 'black'}
          size={25}
          onPress={handleLikeActivityService}
        />
        <IconButton
          icon="comment-outline"
          iconColor={'black'}
          size={25}
          onPress={commentClickHandler}
        />
      </View>
      {commentList ? (
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.commentPreviewMainContainer}>
          <View style={styles.commentPreviewContainer}>
            <Avatar.Text size={30} label="SC" />
            <View style={styles.rightContainer}>
              <Text style={styles.userName}>
                {commentList[commentList.length - 1].name}
              </Text>
              <Text style={styles.message}>
                {commentList[commentList.length - 1].message}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
      <View style={styles.footer}>
        <Avatar.Text size={28} label="SC" />
        <TextInput
          ref={inputRef}
          value={comment}
          onChangeText={text => setComment(text)}
          style={styles.commentInput}
          placeholder="Add a Comment"
        />
        <Button
          onPress={handleCommentActivityService}
          disabled={comment.length ? false : true}>
          <Text
            style={[
              styles.cmntBtnText,
              {color: comment.length ? colorPrimary : 'grey'},
            ]}>
            Post
          </Text>
        </Button>
      </View>
      <CommentModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        activityId={acitivity._id}
      />
      {/* {isModalVisible ? (
        <CommentModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          activityId={acitivity._id}
        />
      ) : null} */}
    </View>
  );
};

export default RecordActivityCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1),
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
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
    width: responsiveScreenWidth(65),
    borderColor: '#bbbbbb',
    borderWidth: 1,
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(0.7),
    borderRadius: 10,
  },
  cmntBtnText: {
    color: 'grey',
  },
  activitySummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconContainer: {
    padding: 1.5,
    paddingHorizontal: 2.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
  },
  activityDistanceTextContainer: {
    paddingVertical: responsiveScreenHeight(0.4),
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginLeft: responsiveScreenWidth(1.3),
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
  },
  activityDistanceText: {
    color: colorSecondary,
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  userName: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  commentPreviewMainContainer: {
    width: '100%',
  },
  commentPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: responsiveScreenHeight(1.7),
  },
  rightContainer: {
    marginLeft: responsiveScreenWidth(2),
  },
  message: {
    marginTop: responsiveScreenHeight(0.5),
    fontSize: responsiveFontSize(1.7),
    fontWeight: 400,
  },
});