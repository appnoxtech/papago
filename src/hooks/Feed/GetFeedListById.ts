import { GetActivityByIdService } from "../../services/Dashboard/record.service";
import {Alert} from "react-native";

const useGetFeedListByIdHandler = () => {
    const GetActivityByIdHandler = async (id: string) => {
        try {
          const res = await GetActivityByIdService(id);
          const {data} = res.data;
          return data;
        } catch (error: any) {
          Alert.alert('Error', error.response.data.errors[0].message);
        }
    };
    return GetActivityByIdHandler
}

export default useGetFeedListByIdHandler;