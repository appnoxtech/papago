import {Alert} from 'react-native';
import { useDispatch } from "react-redux";
import { updateUserActivityList } from "../../redux/reducers/user";
import { GetActivityListService } from "../../services/Dashboard/record.service";

const useGetActivityFeedList = () => {
    const dispatch = useDispatch();

    const getUserActivityFeedList = async() => {
        try {
         const response = await GetActivityListService();
         const list = response.data.data;
      
         
         if(list.length){
           dispatch(updateUserActivityList([...list]));
         }
        } catch (error: any) {
          Alert.alert('Error', error.response.data.errors[0].message);
        }
     }
     return getUserActivityFeedList;
}

export default useGetActivityFeedList;