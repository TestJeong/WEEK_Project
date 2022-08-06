import realm, {ToDoType} from '@/db';
import PushNotification from 'react-native-push-notification';
import {Realm_TodoDataList} from '@/utils/realmHelper';
import {UpdateMode} from 'realm';
import {aq} from '.';
import {IOS_Notif, Notif_Day} from '@/utils/Day';
import {Schedule_Notif} from '@/utils/notificationHelper';

export const helperTodoItemDelete = (data: ToDoType) => {
  const deleteTodoItem = Realm_TodoDataList.filtered('listContent == $0', data.listContent);
  const notificationID = String(data.id);
  PushNotification.cancelLocalNotification(notificationID); //{id: String_ID}
  realm.write(() => {
    realm.delete(deleteTodoItem);
  });
};

export const helperTodoItemSave = (state: any, payload: aq) => {
  const {todoData, twelve_HoursTime, onClickDay, onClickPriority, twenty_Four_HoursTime, inputCategoryData} = state;
  realm.write(() => {
    realm.create<ToDoType>(
      'TodoDataList',
      {
        createTime: todoData.createTime,
        categoryTitle: inputCategoryData ? inputCategoryData.title : todoData.categoryTitle,
        listContent: payload.todoTitle,
        listMemo: payload.todoMemo,
        listEnabled: payload.isEnableds,
        listTime: twelve_HoursTime ? twelve_HoursTime : todoData.listTime ? todoData.listTime : null,
        listDay: onClickDay ? Number(onClickDay.replace(/-/g, '')) : todoData.listDay ? todoData.listDay : null,
        listPriority: onClickPriority ? onClickPriority : todoData.listPriority ? todoData.listPriority : null,
        listTime_Data: twenty_Four_HoursTime ? twenty_Four_HoursTime : todoData.listTime_Data ? todoData.listTime_Data : null,
      },
      UpdateMode.Modified,
    );

    // 투두 디테일에서 카테고리 변경시 실행할 함수
    if (inputCategoryData) {
      realm.create<ToDoType>(
        'TodoDataList',
        {
          createTime: todoData.createTime,
          categoryTitle: inputCategoryData.title,
        },
        UpdateMode.Modified,
      );
    }
  });
  //
};

export const helperTodoClear = (data: ToDoType) => {
  const Notif_ID = data.id;
  const String_ID = String(Notif_ID);

  realm.write(() => {
    realm.create<ToDoType>(
      'TodoDataList',
      {
        createTime: data.createTime,
        listClear: !data.listClear,
      },
      UpdateMode.Modified,
    );
  });

  if (data.listDay && data.listTime_Data && data.listClear === true) {
    PushNotification.cancelLocalNotification(String_ID); //{id: String_ID}
  } else if (
    data.listDay &&
    data.listTime_Data &&
    data.listClear === false &&
    new Date(IOS_Notif(data.listDay, data.listTime_Data)).toLocaleString() > new Date(Notif_Day()).toLocaleString() &&
    data.listEnabled
  ) {
    Schedule_Notif({onClickDay: data.listDay, timeString: data.listTime_Data, todoContents: data.listContent, NotifID: Number(String_ID), categoryTitle: data.categoryTitle});
  }
};

export const helperTodoNotification = () => {};
