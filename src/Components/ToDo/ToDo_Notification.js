import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

let lastId = 0;

export const Schedule_Notif = (
  onClickDay,
  timeString,
  todoContents,
  NotifID,
  categoryTitle,
) => {
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
      channelId: 'load-channel-id', // (required)
      channelName: `Default channel`, // (required)
      channelDescription: 'A default channel', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) =>
      console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const ClickTime = onClickDay;
  const Change_String = String(ClickTime);
  const years = Change_String.substring(0, 4);
  const month = Change_String.substring(4, 6);
  const day = Change_String.substring(6, 8);

  const allDay = years + '-' + month + '-' + day;
  const StringTime = timeString;
  const Alls = allDay + 'T' + StringTime;

  const ScheduleNotif = () => {
    lastId++;

    PushNotification.localNotificationSchedule({
      channelId: 'load-channel-id',
      id: NotifID,
      title: categoryTitle,
      message: todoContents,
      date: new Date(Alls),
      allowWhileIdle: false,
      number: lastId,
    });
  };

  return ScheduleNotif();
};

// 알람 추가 할때.
