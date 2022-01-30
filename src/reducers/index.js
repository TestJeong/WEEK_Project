import {combineReducers} from 'redux';
import Catagory from './Catagory';
import {CATEGORY_DATA} from '../Components/HomeScreen/Category/CategorySlice';

const rootReducer = combineReducers({
  Catagory,
  CATEGORY_DATA,
});
export default rootReducer;
