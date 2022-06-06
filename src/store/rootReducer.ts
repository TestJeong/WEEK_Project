import {CATEGORY_DATA} from '../pages/homeScreen/category/CategorySlice';
import {TODO_DATA} from '../pages/homeScreen/todo/ToDoSlice';
import {CALENDAR_DATA} from '../pages/calendarScreen/CalendarSlice';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  TODO_DATA,
  CATEGORY_DATA,
  CALENDAR_DATA,
});
export default rootReducer;
