import { useDispatch } from "react-redux";
import { addEventParams } from "../../interfaces/reducers/PlanTripInterface";
import { UpdateInvitedEventList, UpdatePendingInvitationEventList } from "../../redux/reducers/events.reducer";
import { GetInvitedEventListService } from "../../services/Dashboard/events.service"
import useHandleError from "../common/handelError";

const useGetInvitedEventListHook = () => {
    const dispatch = useDispatch();
    const handleError = useHandleError();

    const GetInvitedEventListHandler = async () => {
        try {
            const res = await GetInvitedEventListService();
            const invitedEventList = res?.data?.data;
            
            if(invitedEventList?.length) {
                // Seprating the Invited Event list into 2 sublist which are following:
                // 1. List of events whose invitation is still pending
                // 2. List of events whose invitation has been accepted 

                const pendingInvitationEventList = invitedEventList.filter((item: addEventParams) => !item?.isAccepted);
                const participatedEventList = invitedEventList.filter((item: addEventParams) => item?.isAccepted);

                participatedEventList.length ? dispatch(UpdateInvitedEventList(participatedEventList)) : dispatch(UpdateInvitedEventList([]));
                pendingInvitationEventList.length ? dispatch(UpdatePendingInvitationEventList(pendingInvitationEventList)) :  dispatch(UpdatePendingInvitationEventList([]));
            }
        } catch (error) {
            handleError(error)
        }
    }

    return GetInvitedEventListHandler;
}

export default useGetInvitedEventListHook;