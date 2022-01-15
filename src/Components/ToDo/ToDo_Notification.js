import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {ANDROID_Notif, IOS_Notif} from '../Day';

let lastId = 0;
export const Schedule_Notif = (
  onClickDay,
  timeString,
  todoContents,
  NotifID,
  categoryTitle,
  num,
) => {
  console.log(
    '알람 테스트',
    onClickDay,
    timeString,
    todoContents,
    NotifID,
    categoryTitle,
    num,
  );
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATION1:', notification);

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION2:', notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'load-channel-id',
      channelName: `Default channel`,
      channelDescription: 'A default channel',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) =>
      console.log(`createChannel 'default-channel-id' returned '${created}'`),
  );

  const Platform_Date =
    Platform === 'ios'
      ? IOS_Notif(onClickDay, timeString)
      : ANDROID_Notif(onClickDay, timeString);

  console.log('A', IOS_Notif(onClickDay, timeString));
  console.log('날짜 테스트', new Date(Platform_Date));

  const ScheduleNotif = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'load-channel-id',
      id: NotifID,
      title: categoryTitle,
      message: todoContents,
      date: new Date(Date.now() + 60 * 1000),
      allowWhileIdle: false,
      number: num ? num : 1,
    });
  };

  return ScheduleNotif();
};

///////////////////////////////////////////////////////////////////////////

export const Edit_Schedule_Notif = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATION1:', notification);

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION2:', notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'load-channel-id',
      channelName: `Default channel`,
      channelDescription: 'A default channel',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) =>
      console.log(`createChannel 'default-channel-id' returned '${created}'`),
  );

  PushNotification.getScheduledLocalNotifications((notif) => {
    let Edit_lastID = 1;
    const Schedule_sort = notif.sort((a, b) => {
      return a.date - b.date;
    });

    for (let data of Schedule_sort) {
      let tests = Edit_lastID++;
      PushNotification.localNotificationSchedule({
        channelId: 'load-channel-id',
        id: data.id,
        title: data.title,
        message: data.message,
        date: new Date(data.date),
        allowWhileIdle: false,
        number: tests,
      });
    }
  });
};
