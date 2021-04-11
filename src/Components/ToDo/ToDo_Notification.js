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
) => {
  PushNotification.getApplicationIconBadgeNumber(function (number) {
    if (number > 0) {
      PushNotification.setApplicationIconBadgeNumber(0);
    }
  });

  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
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

  const ScheduleNotif = () => {
    lastId++;

    PushNotification.localNotificationSchedule({
      channelId: 'load-channel-id',
      id: NotifID,
      title: categoryTitle,
      message: todoContents,
      date: new Date(Platform_Date),
      allowWhileIdle: false,
      number: lastId,
    });
  };
  console.log('last', lastId);

  return ScheduleNotif();
};

// 알람 추가 할때.
