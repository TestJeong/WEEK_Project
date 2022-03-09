import {ToDoType} from '../../db';

export interface ItodoType {
  item: ToDoType;
}

export interface MarkedDate {
  [key: string]: object;
}
