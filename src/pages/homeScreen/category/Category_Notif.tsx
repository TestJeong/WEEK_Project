import {ToDoType} from '@/db';
import {ANDROID_Notif, IOS_Notif, Notif_Day, Today} from '@/utils/Day';
import {Schedule_Notif} from '@/utils/notificationHelper';

interface CategoryNotificationType {
  item: ToDoType;
  categoryTitle: string;
}

export const Category_Notif = ({item, categoryTitle}: CategoryNotificationType) => {
  new Date(IOS_Notif(item.listDay, item.listTime_Data)) > new Date(Notif_Day()) &&
    Schedule_Notif({onClickDay: Today(item.listDay), timeString: item.listTime_Data, todoContents: item.listContent, NotifID: item.id, categoryTitle});
};
