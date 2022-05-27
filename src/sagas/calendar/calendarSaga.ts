import realm, {CategoryType, ToDoType} from '@/db';

interface CustomTodoType extends ToDoType {
  colors: string;
}

export const helperAgendaRequest = (payload: any) => {
  const TodoData = realm.objects<ToDoType>('TodoDataList');
  const CategoryData = realm.objects<CategoryType>('CategoryList');

  let items = [];

  for (let i = 0; i < 7; i++) {
    const CurrentWeekMonday = new Date(payload).getTime();

    const date = new Date(CurrentWeekMonday + 864e5 * i); // 864e5 == 86400000 == 24*60*60*1000 현재일로 부터 다음날
    const dateString = date.toISOString().split('T')[0];
    const intTime = Number(dateString.replace(/-/g, ''));

    const FindTodoData = TodoData.filtered('listDay == $0', intTime);
    const SortTodoData = FindTodoData.sorted('createTime');

    if (SortTodoData.length === 0) {
      items.push({title: dateString, data: [{}]});
    } else {
      let todoDataArray: CustomTodoType[] = [];
      SortTodoData.map((date) => {
        const Category = CategoryData.filtered('title == $0', date.categoryTitle);
        todoDataArray.push({
          createTime: date.createTime,
          listContent: date.listContent,
          categoryTitle: date.categoryTitle,
          listTime: date.listTime,
          listDay: date.listDay,
          listPriority: date.listPriority,
          listMemo: date.listMemo,
          listClear: date.listClear,
          colors: Category[0].color,
          listEnabled: date.listEnabled,
        });
      });

      items.push({title: dateString, data: todoDataArray});
    }
  }

  return items;
};
