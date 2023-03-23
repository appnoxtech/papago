import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { updateFriendList } from "../../redux/reducers/user";
import { GetFriendListService } from "../../services/Dashboard/friend.service"
import useHandleError from "./handelError";

const useGetFriendListHook = () => {
    const dispatch = useDispatch();
    const handleError = useHandleError();

    const getFriendListHandler = async () => {
        try {
            const res = await GetFriendListService();
            const list = res.data.data
            if(list.length) {
                return dispatch(updateFriendList(list));
            }
        } catch (error) {
            handleError(error);
        }
    }
    return getFriendListHandler;
}

export default useGetFriendListHook;