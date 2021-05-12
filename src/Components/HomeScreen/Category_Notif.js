import {ANDROID_Notif, Notif_Day} from '../Day';
import {Schedule_Notif} from '../ToDo/ToDo_Notification';

export const Category_Notif = (item, categoryTitle) => {
  new Date(ANDROID_Notif(item.listDay, item.listTime_Data)) >
    new Date(Notif_Day()) &&
    Schedule_Notif(
      item.listDay,
      item.listTime_Data,
      item.listContent,
      item.id,
      categoryTitle,
    );
};
