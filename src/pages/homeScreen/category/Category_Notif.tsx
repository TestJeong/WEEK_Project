import {ToDoType} from '@/db';
import {ANDROID_Notif, Notif_Day} from '@/utils/Day';
import {Schedule_Notif} from '@homeScreen/todo/ToDo_Notification';

interface CategoryNotificationType {
  item: ToDoType;
  categoryTitle: string;
}

export const Category_Notif = ({item, categoryTitle}: CategoryNotificationType) => {
  new Date(ANDROID_Notif(item.listDay, item.listTime_Data)) > new Date(Notif_Day()) &&
    Schedule_Notif({onClickDay: item.listDay, timeString: item.listTime_Data, todoContents: item.listContent, NotifID: item.id, categoryTitle});
};
