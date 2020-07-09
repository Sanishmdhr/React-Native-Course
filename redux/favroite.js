import * as ActionTypes from './ActionTypes';

export const favorite = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
                
        default:
          return state;
      }
};