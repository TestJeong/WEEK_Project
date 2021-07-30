import {combineReducers} from 'redux';
import Catagory from './Catagory';
import {h1, myInputData} from './toolkit';

const rootReducer = combineReducers({
  Catagory,
  counter: h1,
  myInputData,
});
export default rootReducer;
