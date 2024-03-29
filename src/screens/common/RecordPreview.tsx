import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import month from '../../utlis/month';
import TextInputComponent from '../../components/common/inputs/TextInputComponent';
import {inputsHandlerParams} from '../../interfaces/components/inputs';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';
import {Button} from 'react-native-paper';
import BtnPrimary from '../../components/common/buttons/BtnPrimary';
import { resetRecordActivityValue, updateRecordActivityValue } from '../../redux/reducers/recordActivityReducer';
import { useNavigation } from '@react-navigation/native';
import { updateUserActivityList } from '../../redux/reducers/user';
import { AddActivityService, UpdateActivityService } from '../../services/Dashboard/record.service';
import { addActivity, recordActivityData } from '../../interfaces/Dashboard/record.interface';
import { resetMapData } from '../../redux/reducers/map.reducer';
import { resetRecordStatus } from '../../redux/reducers/record.reducer';
const date = new Date();

const RecordPreview = () => {
  // @ts-ignore
  const [input, setInput] = useState({
    title: `Morning ${month[date.getMonth()]} ${date.getDate()}th`,
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isMediaAccess, setIsMediaAccess] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const {selectedActivity} = useSelector((state: any) => state.activity);
  const {timer, distance, activity} = useSelector((state: any) => state.recordActivity);
  const getTimeFormat = () => {
    var d = new Date(1000 * Math.round(timer / 1000)); // round to nearest second
    function pad(i: number) {
      return ('0' + i).slice(-2);
    }
    var str =
      d.getUTCHours() +
      ':' +
      pad(d.getUTCMinutes()) +
      ':' +
      pad(d.getUTCSeconds());
    return str;
  };

  const handleChange = ({value, id}: inputsHandlerParams) => {
    setInput(oldState => {
      return {
        ...oldState,
        [id]: value,
      };
    });
    validation();
  };

  const validation = () => {
    let state: boolean;
    if (input.title.length <= 0) {
      state = false;
    } else {
      state = true;
    }
    setIsActive(state);
  };

  const handleSaveActivity = () => {
      const data = {
         finishedAt: activity.finishedAt,
         startedAt: activity.startedAt,
         activityName: input.title,
         distance: distance,
         duration: timer,
         activityTypeId: selectedActivity._id,
         immediatePoints: [...activity.immediatePoints],
    }
    console.log('data', data);
    AddActivtyServiceHandler(data);
  };

  const AddActivtyServiceHandler = async (data: addActivity) => {
    try {
      const res = await AddActivityService(data);
      // const activityId = res.data.data;
      dispatch(resetMapData());
      dispatch(resetRecordStatus());
      dispatch(resetRecordActivityValue());
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard' as never}]
      });
    } catch (error: any) {
      console.log('error', error);
      
       Alert.alert('Error', error.response.data.errors[0].message);
    }
 };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.primaryText}>ALMOST DONE!</Text>
        <Text style={styles.secondaryText}>
          {selectedActivity.activityName} - {date.getDate()}{' '}
          {month[date.getMonth()]}
        </Text>
        <Text style={styles.activitySummaryText}>
          {distance} km - {getTimeFormat()}
        </Text>
        <View style={styles.textContainer}>
          <TextInputComponent
            label="Add Title"
            id="title"
            value={input.title}
            handleChange={handleChange}
            subText=""
          />
        </View>
        {isMediaAccess ? null : (
          <View style={styles.mediaAccessContainer}>
            <Text style={styles.textHead}>No Photo permission</Text>
            <Text style={styles.subText}>
              If you give Papa Go permission to your photos, we can make your
              activity more awesome by adding photos taken during your activity.
            </Text>
            <Text style={styles.permissionText}>Give Permission</Text>
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <BtnPrimary
          label="Save these to your activity"
          isActive={isActive}
          handlePress={handleSaveActivity}
        />
        <Button 
           mode="contained"
           buttonColor="white"
           style={styles.btn}
        >
            <Text style={styles.btnText}>Not now</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default RecordPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(1),
    alignItems: 'center',
  },
  primaryText: {
    marginTop: responsiveScreenHeight(4),
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#bbbbbb',
    marginBottom: responsiveScreenHeight(1),
  },
  secondaryText: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: responsiveScreenHeight(1),
  },
  activitySummaryText: {
    fontSize: responsiveFontSize(1.4),
    color: '#bbbbbb',
    fontWeight: 'bold',
  },
  header: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: responsiveScreenHeight(1),
  },
  textContainer: {
    marginTop: responsiveScreenHeight(5),
    width: '92%',
  },
  textHead: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: responsiveScreenHeight(0.5),
  },
  mediaAccessContainer: {
    width: '100%',
    marginTop: responsiveScreenHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  subText: {
    fontSize: responsiveFontSize(1.7),
    color: 'grey',
    opacity: 0.5,
  },
  permissionText: {
    color: colorPrimary,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveScreenHeight(0.5),
  },
  btnContainer: {
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
  },
  btnText: {
    color: colorPrimary,
    fontSize: responsiveFontSize(1.8)
  },
  btn: {
    marginTop: responsiveScreenHeight(0.5),
    paddingVertical: responsiveScreenHeight(0.6),
    width: responsiveScreenWidth(95),
  }
});
