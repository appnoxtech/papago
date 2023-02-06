import {Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import {data} from '../interfaces/Dashboard/record.interface';
import { updateActivity, updateActivityList } from '../redux/reducers/activity';
import {GetAllActivityService} from '../services/Dashboard/activity.service';

const useGetActivityList = () => {
  const dispatch = useDispatch();

  const getActivityList = async () => {
    try {
      const res = await GetAllActivityService();
      const {data} = res.data;
      console.log('Data', data);
      const Data = [
        {
          title: 'POPULAR ACTIVITIES',
          data: data.filter((item: data) => item.isPopular),
        },
        {
          title: 'OTHER ACTIVITIES',
          data: data.filter((item: data) => !item.isPopular),
        },
      ];
      dispatch(updateActivityList(Data));
      dispatch(updateActivity(data[0]));
    } catch (error: any) {
      Alert.alert('Error Message', error.response.data.errors[0].message);
    }
  };

  getActivityList();
};

export default useGetActivityList;
