import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {dishes} from './dishes';
import {comments} from './comments';
import {leaders} from './leaders';
import {promos} from './promos'
import {favorite} from './favroite';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';


export const ConfigureStore = () => {

  const config={
    key : 'root',
    storage,
    debug:true
  } 
  const store = createStore(
      persistCombineReducers(config,{
          dishes,
          comments,
          promos,
          leaders,
          favorite
      }),
      applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store)

  return {persistor, store};
}