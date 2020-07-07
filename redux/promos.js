import * as ActionTypes from './ActionTypes';

export const promos = ( state = {
  isLoading:false,
  errmess:null,
  promos:[]
}, action) => {

    switch(action.type) {

      case ActionTypes.ADD_PROMOS: 
        return {...state, isLoading:false, errmess:null, promos:action.payload};

      case ActionTypes.PROMOS_LOADING:
        return {...state, isLoading:true, errmess:null, promos:[]}

      case ActionTypes.PROMOS_FAILED:
        return {...state, isLoading:false, errmess:action.payload, promos:[]}

      default:
        return state;  
    }
}
