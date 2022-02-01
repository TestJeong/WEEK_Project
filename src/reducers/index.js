import {combineReducers} from 'redux';
import Catagory from './Catagory';
import {CATEGORY_DATA} from '../Components/HomeScreen/Category/CategorySlice';
import {TODO_DATA} from '../Components/HomeScreen/ToDo/ToDoSlice';

const rootReducer = combineReducers({
  Catagory,
  TODO_DATA,
  CATEGORY_DATA,
});
export default rootReducer;
