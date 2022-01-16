import {ToDoType} from '../../db';
import {ANDROID_Notif, Notif_Day} from '../Day';
import {Schedule_Notif} from '../ToDo/ToDo_Notification';

interface CategoryNotificationType {
  item: ToDoType;
  categoryTitle: string;
}

export const Category_Notif = ({item, categoryTitle}: CategoryNotificationType) => {
  new Date(ANDROID_Notif(item.listDay, item.listTime_Data)) > new Date(Notif_Day()) && Schedule_Notif(item.listDay, item.listTime_Data, item.listContent, item.id, categoryTitle);
};
