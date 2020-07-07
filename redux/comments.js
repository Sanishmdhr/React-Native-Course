import * as ActionTypes from './ActionTypes';

export const comments = (state={
  isLoading:false,
  errmess:null,
  comments:[]
}, action) => {

    switch(action.type){
      case ActionTypes.COMMENTS_LOADING:
        return {...state, isLoading:true, errmess:null, comments:[]};

      case ActionTypes.ADD_COMMENTS:
        return {...state, isLoading:false, errmess:null, comments:action.payload};
      
      case ActionTypes.COMMENT_FAILED:
        return {...state, isLoading:false, errmess:action.payload, comments:[]}

      default:
       return state; 
    }


}