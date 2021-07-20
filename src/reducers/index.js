import {combineReducers} from 'redux';
import Catagory from './Catagory';
import {h1} from './toolkit';

const rootReducer = combineReducers({
  Catagory,
  counter: h1,
});
export default rootReducer;
