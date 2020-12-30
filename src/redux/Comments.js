import * as ActionTypes from './ActionTypes';
import { actionTypes } from 'react-redux-form';

export const Comments = (state = {errMsg:null,comments:[]}, action) => {
    switch (action.type) {

        case ActionTypes.ADD_COMMENTS:
            return{...state,errMsg:null,comments:action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return {...state,errMsg:action.payload}
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            console.log("Comment: ", comment);
            return {...state,comments:state.comments.concat(comment)};

        default:
          return state;
      }
};