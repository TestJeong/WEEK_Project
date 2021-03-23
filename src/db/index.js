import Realm from 'realm';

class Category {}

Category.schema = {
  name: 'CategoryList',
  primaryKey: 'createTime',
  properties: {
    createTime: 'string',
    title: 'string',
    color: {
      type: 'string',
      default: '#c2c8c5',
    },
    todoData: {
      type: 'list',
      objectType: 'TodoDataList',
    },
  },
};

class TodoData {}

TodoData.schema = {
  name: 'TodoDataList',
  primaryKey: 'createTime',
  properties: {
    createTime: 'string',
    categoryTitle: 'string',
    listContent: 'string',
    listDay: 'int?',
    listTime: 'string?',
    listPriority: 'int?',
    listMemo: 'string?',
    listClear: {type: 'bool', default: false},
  },
};

let realm = new Realm({
  schema: [Category, TodoData],
  schemaVersion: 8,
  migration: (oldRealm, newRealm) => {
    // only apply this change if upgrading to schemaVersion 1
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects('schema');
      const newObjects = newRealm.objects('schema');

      // loop through all objects and set the name property in the new schema
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].otherName = 'otherName';
      }
    }
  },
});

export default realm;
