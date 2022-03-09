import Realm from 'realm';
import {Day} from '../Utils/Day';

export interface CategoryType {
  createTime: string;
  title: string;
  color: string;
  todoData: ToDoType[];
}

export interface ToDoType {
  createTime: string;
  categoryTitle: string;
  id: number;
  listContent: string;
  listDay?: number;
  listTime?: string;
  listTime_Data?: string;
  listPriority?: number;
  listMemo?: string;
  listClear: boolean;
  listEnabled: boolean;
}

export const Category: Realm.ObjectSchema = {
  name: 'CategoryList',
  primaryKey: 'createTime',
  properties: {
    createTime: {type: 'string', default: Day()},
    title: {type: 'string', default: 'Inbox'},
    color: {
      type: 'string',
      default: '#c2c8c5',
    },
    todoData: {type: 'list', objectType: 'TodoDataList'},
  },
};

export const TodoData: Realm.ObjectSchema = {
  name: 'TodoDataList',
  primaryKey: 'createTime',
  properties: {
    createTime: 'string',
    categoryTitle: 'string',
    id: 'int',
    listContent: 'string',
    listDay: 'int?',
    listTime: 'string?',
    listTime_Data: 'string?',
    listPriority: 'int?',
    listMemo: 'string?',
    listClear: {type: 'bool', default: false},
    listEnabled: {type: 'bool', default: false},
  },
};

let realm = new Realm({
  schema: [Category, TodoData],
  schemaVersion: 16,
  migration: (oldRealm, newRealm) => {
    // only apply this change if upgrading to schemaVersion 1
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects('schema');
      const newObjects: any = newRealm.objects('schema');

      // loop through all objects and set the name property in the new schema
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].otherName = 'otherName';
      }
    }
  },
});

export default realm;
