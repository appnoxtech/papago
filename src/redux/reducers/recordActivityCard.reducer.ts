import { actvityCommentDetails } from "../../interfaces/Dashboard/record.interface";

const initialState = {
    commentList: null,
    likeList: null,
    
}

interface updateCommentList {
    type: 'UPDATE_COMMENT_LIST',
    payload: Array<actvityCommentDetails>
}

type action = updateCommentList;

const RecordActivityCard = (store = initialState, action: action) => {
    switch (action.type) {
        case 'UPDATE_COMMENT_LIST': {

        }
            
            break;
    
        default:
            break;
    }
}

export default RecordActivityCard;