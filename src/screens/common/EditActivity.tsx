import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderWithBackBtn from '../../components/common/Headers/HeaderWithBackBtn';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { colorPrimary } from '../../../assets/styles/GlobalTheme';
import { Button } from 'react-native-paper';
import { updateActivity } from '../../redux/reducers/activity';
import { UpdateActivityService } from '../../services/Dashboard/record.service';
import useGetActivityFeedList from '../../hooks/Feed/GetFeedList.hook';

const EditActivity: React.FC<any> = ({route}) => {
  const dispatch = useDispatch();
  const getUserActivityFeedList = useGetActivityFeedList();
  const {activityDetails} = route.params;
  const [title, setTitle] = useState('')
  const navigation = useNavigation();
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const handleActivityPress = () => {
    navigation.navigate('SelectActivity' as never);
  };

  useEffect(() => {
    dispatch(updateActivity(activityDetails.activityData));
  }, []);

  console.log('selectedActivity', selectedActivity);
  
  const updateActivtyServiceHandler = async () => {
    try {
      const data = {
         activityId: activityDetails._id,
         activityTypeId: selectedActivity._id,
         activityName: title,
      }
      console.log('data', data);
      await UpdateActivityService(data);
      await  getUserActivityFeedList();
      Alert.alert('Notification', 'Successfully Updated Activity');
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard' as never}],
      });
    } catch (error) {
      Alert.alert('Notification', 'Successfully Updated Activity');
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <HeaderWithBackBtn title="Edit activity" />
        <View style={styles.profileContainer}>
           <View style={styles.profile}>
               <Feather name='edit' color='black' style={styles.editIcon} />
           </View>
           <TextInput
              style={styles.textInput}
              placeholder='Write a title...'
              value={title}
              onChangeText={(text) => setTitle(text)}
              numberOfLines={1}
           />
        </View>

        <View style={styles.tiles}>
          <View>
            <Text style={styles.primaryText}>Activity</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleActivityPress}>
              <View style={styles.activityContainer}>
                <Text style={styles.activityName}>{selectedActivity.activityName}</Text>
                <Entypo style={styles.icon} name="chevron-right" size={18} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
            <Button
               mode='contained'
               buttonColor={colorPrimary}
               style={styles.btn}
               onPress={updateActivtyServiceHandler}
            >
                <Text style={styles.btnText}>Save Changes</Text>
            </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  btn: {
    width: responsiveScreenWidth(80),
    paddingVertical: responsiveScreenHeight(0.6)
  },
  btnText: {
    fontSize: responsiveFontSize(2)
  },
  btnContainer: {
   justifyContent: 'center',
   alignItems: 'center',
   marginVertical: responsiveScreenHeight(2)
  },
  mainContainer: {
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1),
    alignItems: 'flex-end',
    flexDirection:'row',
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.8,
  },
  tiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(3.5),
    paddingVertical: responsiveScreenHeight(2),
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.8,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityName: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  icon: {
    marginTop: responsiveScreenHeight(0.5),
  },
  primaryText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
  },
  mainHeading: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: responsiveScreenWidth(3),
  },
  profile:{
    position: 'relative',
    width: responsiveScreenWidth(15),
    height: responsiveScreenHeight(6.5),
    marginRight: responsiveScreenWidth(2),
    backgroundColor: colorPrimary,
    borderRadius: 5
  },
  editIcon: {
    position: 'absolute',
    top: 3,
    right: 3,
  },
  textInput: {
    fontSize: responsiveFontSize(2.7),
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: responsiveScreenWidth(2),
    width: responsiveScreenWidth(80)
  }
});
