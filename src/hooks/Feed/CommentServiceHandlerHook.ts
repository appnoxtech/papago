import { LikeRecordActivityService } from "../../services/Dashboard/record.service";
import {Alert} from 'react-native';
import useHandleError from "../common/handelError";

interface params {
    activityId: string,
    comment: string,
}

const useCommentHandlerHooks = () => {
    const handelError = useHandleError();

    const handleCommentActivityService = async ({activityId, comment}: params) => {
        try {
          const data = {
            activityId: activityId,
            message: comment,
          }
          console.log('data', data);
          await LikeRecordActivityService(data);
          return Alert.alert('Notification', 'Comment');
        } catch (error: any) {
            return handelError(error);
        }
    }
    return handleCommentActivityService
}

export default useCommentHandlerHooks;