import {Platform} from 'react-native';
import PushNotification, {PushNotificationScheduledLocalObject} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {IOS_Notif} from '../../../utils/Day';
import {InotifType} from './todoType';

export const Schedule_Notif = ({onClickDay, timeString, todoContents, NotifID, categoryTitle, num}: InotifType) => {
  //console.log('알람 테스트', onClickDay, timeString, todoContents, NotifID, categoryTitle, num);
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
    (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`),
  );

  //const Platform_Date = Platform.OS === 'ios' ? IOS_Notif(onClickDay, timeString) : ANDROID_Notif(onClickDay, timeString);
  const Platform_Date = IOS_Notif(onClickDay, timeString);

  const ScheduleNotif = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'load-channel-id',
      id: NotifID,
      title: categoryTitle,
      message: todoContents,
      date: new Date(Platform_Date),
      allowWhileIdle: false,
      number: num ? num : 1,
    });
  };

  return ScheduleNotif();
};

///////////////////////////////////////////////////////////////////////////

export const Edit_Schedule_Notif = () => {
  PushNotification.configure({
    permissions: {alert: true, badge: true, sound: true},
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
    () => {},
  );

  interface IcustomNotifType {
    data: {};
    date: Date;
    id: string;
    message?: string;
    number: number;
    soundName: string;
    title: string;
  }
  // 현재 알림 리스트
  PushNotification.getScheduledLocalNotifications((notif: PushNotificationScheduledLocalObject[]) => {
    let Edit_lastID = 1;
    const Schedule_sort: IcustomNotifType[] = notif.sort((a: any, b: any) => {
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
