import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {actvityCommentDetails} from '../../interfaces/Dashboard/record.interface';
import CommentCard from '../../components/common/cards/CommentCard';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Button} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';
import useGetFeedListByIdHandler from '../../hooks/Feed/GetFeedListById';
import useCommentHandlerHooks from '../../hooks/Feed/CommentServiceHandlerHook';
import {GetRecordLikeAndCommentDetails} from '../../services/Dashboard/record.service';
import useHandleError from '../../hooks/common/handelError';

interface props {
  isModalVisible: boolean;
  setModalVisible: any;
  activityId: string;
  onClose?: any
}

const CommentModal: React.FC<props> = ({
  isModalVisible,
  setModalVisible,
  activityId,
  onClose = () => {},
}) => {
  const textInputRef = useRef<TextInput>(null);
  const GetFeedListById = useGetFeedListByIdHandler();
  const commentShareActivity = useCommentHandlerHooks();
  const [comment, setComment] = useState('');
  const handleError = useHandleError();
  const [commentList, setCommentList] =
    useState<Array<actvityCommentDetails> | null>(null);

  const handleCommentPost = async () => {
    await commentShareActivity({activityId, comment});
    await handleGetActivityLikeAndCommentDetails();
    setComment('');
  };

  const handleGetActivityLikeAndCommentDetails = async () => {
    try {
      const res = await GetRecordLikeAndCommentDetails(activityId);
      const {commentData, likeData} = res.data.data;

      if (commentData.length) {
        setCommentList([...commentData]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    handleGetActivityLikeAndCommentDetails();
  }, [isModalVisible]);

  return (
    <View style={styles.mainContainer}>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown">
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.headerContainer}>
              <Entypo
                onPress={() => {
                  setModalVisible(false);
                  onClose();
                }}
                name="circle-with-cross"
                size={28}
                color="grey"
              />
              <View style={styles.headerLeftSide}>
                <Text style={styles.header}>Comments</Text>
              </View>
            </View>
            <FlatList
              data={commentList}
              renderItem={({item}) => <CommentCard item={item} />}
              keyExtractor={item => item._id}
              style={styles.containerStyle}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.footer}>
                <Avatar.Text size={30} label="SC" />
                <View>
                  <TextInput
                    //@ts-ignore
                    ref={textInputRef}
                    value={comment}
                    onChangeText={text => setComment(text)}
                    style={styles.commentInput}
                    placeholder="Add a Comment"
                  />
                </View>
                <Button
                  onPress={handleCommentPost}
                  disabled={comment.length ? false : true}>
                  <Text
                    style={[{color: comment.length ? colorPrimary : 'grey'}]}>
                    Post
                  </Text>
                </Button>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </View>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    margin: 0,
  },
  containerStyle: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(2),
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#bbbbbb',
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(2.3),
    paddingVertical: responsiveScreenHeight(0.5),
  },
  header: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  commentInput: {
    width: responsiveScreenWidth(65),
    borderColor: '#bbbbbb',
    borderWidth: 1,
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: 10,
  },
  headerLeftSide: {
    width: responsiveScreenWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
