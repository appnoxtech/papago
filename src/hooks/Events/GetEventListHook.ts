import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { UpdateEventList } from "../../redux/reducers/events.reducer";
import { GetEventListService } from "../../services/Dashboard/events.service";

const useGetEventListHook = () => {
   const dispatch = useDispatch();

   const GetEventList = async () => {
     try {
       const res = await GetEventListService();
       const list = res.data.data;
       dispatch(UpdateEventList(list));
     } catch (error) {
       Alert.alert('Error', 'Unable to fetch EventList');
     }
  }
  return GetEventList;
}

export default useGetEventListHook;