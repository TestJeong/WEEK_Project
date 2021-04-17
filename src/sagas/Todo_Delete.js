import realm from '../db';

export const ToDoList_View_Delete = (term) => {
  const BookMarkD = realm.objects('TodoDataList');
  const BookMarkaa = BookMarkD.filtered(
    'listContent == $0',
    term.item.listContent,
  );

  realm.write(() => {
    realm.delete(BookMarkaa);
  });
};

export const Category_List_View_Delete = (term) => {
  const Category_List = realm.objects('CategoryList');
  const Category_List_Data = Category_List.filtered(
    'title == $0',
    term.item.title,
  );

  const TodoList_View = realm.objects('TodoDataList');
  const TodoList_View_Data = TodoList_View.filtered(
    'categoryTitle == $0',
    term.item.title,
  );

  realm.write(() => {
    realm.delete(Category_List_Data);
    realm.delete(TodoList_View_Data);
  });
};

export const Agenda_Call_Data = (term) => {
  const timeToString = (time) => {
    const date = new Date(time);

    const dates = new Date(date - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    return dates;
  };
  const AgendaData = realm.objects('TodoDataList');
  const CategoryData = realm.objects('CategoryList');

  let items = {};

  for (let i = -15; i < 85; i++) {
    const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(
      term !== null ? term + i * 24 * 60 * 60 * 1000 : time,
    );
    const intTime = Number(strTime.replace(/-/g, ''));

    const TodoData_Day = AgendaData.filtered('listDay == $0', intTime);
    const TodoData_Day_Sort = TodoData_Day.sorted('createTime');

    if (TodoData_Day_Sort.length === 0) {
      items[strTime] = [];
    } else {
      items[strTime] = [];
      TodoData_Day_Sort.map((date) => {
        const Category = CategoryData.filtered(
          'title == $0',
          date.categoryTitle,
        );
        items[strTime].push({
          createTime: date.createTime,
          listContent: date.listContent,
          categoryTitle: date.categoryTitle,
          listTime: date.listTime,
          listDay: date.listDay,
          listPriority: date.listPriority,
          listMemo: date.listMemo,
          listClear: date.listClear,
          colors: Category[0].color,
        });
      });
    }
  }

  return items;
};
