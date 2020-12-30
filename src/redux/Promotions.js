import * as ActionTypes from './ActionTypes';

export const Promotions=(state={isLoading:true,errMsg:null,promotions:[]},action)=>
{
    switch(action.type)
    {
        case ActionTypes.ADD_PROMOS:
            return{...state,isLoading:false,errMsg:null,promotions:action.payload};
        case ActionTypes.PROMOS_FAILED:
            return{...state,isLoading:false,errMsg:action.payload};
        case ActionTypes.PROMOS_LOADING:
            return{...state,isLoading:true,errMsg:null,promotions:[]} ;
        default:
            return state;
    }
}