import {combineReducers} from 'redux';
import {CATEGORY_DATA} from '../pages/homeScreen/category/CategorySlice';
import {TODO_DATA} from '@homeScreen/todo/todoSlice';
import {CALENDAR_DATA} from '../pages/calendarScreen/CalendarSlice';

const rootReducer = combineReducers({
  TODO_DATA,
  CATEGORY_DATA,
  CALENDAR_DATA,
});
export default rootReducer;