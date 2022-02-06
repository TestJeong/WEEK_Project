import realm from '../db';

export const ToDoList_View_Delete = (term) => {
  const BookMarkD = realm.objects('TodoDataList');
  const BookMarkaa = BookMarkD.filtered('listContent == $0', term.item.listContent);
  realm.write(() => {
    realm.delete(BookMarkaa);
  });
};

export const Category_List_View_Delete = (term) => {
  realm.write(() => {
    const Category_List = realm.objects('CategoryList');
    const Category_List_Data = Category_List.filtered('title == $0', term.item.title);

    const TodoList_View = realm.objects('TodoDataList');
    const TodoList_View_Data = TodoList_View.filtered('categoryTitle == $0', term.item.title);

    realm.delete(TodoList_View_Data);
    realm.delete(Category_List_Data);
  });
};

export const Agenda_Call_Data = (term) => {
  // const timeToString = (time) => {
  //   const date = new Date(time);

  //   const dates = new Date(date - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];

  //   return dates;
  // };
  const AgendaData = realm.objects('TodoDataList');
  const CategoryData = realm.objects('CategoryList');

  let items = [];

  for (let i = 0; i < 7; i++) {
    // const time = new Date().getTime() + i * 24 * 60 * 60 * 1000; // 157625342
    // const strTime = timeToString(term !== null ? term + i * 24 * 60 * 60 * 1000 : time);
    // const intTime = Number(strTime.replace(/-/g, ''));
    const ho = new Date(term).getTime();

    const date = new Date(ho + 864e5 * i); // 864e5 == 86400000 == 24*60*60*1000 현재일로 부터 다음날
    const dateString = date.toISOString().split('T')[0];
    const intTime = Number(dateString.replace(/-/g, ''));

    const TodoData_Day = AgendaData.filtered('listDay == $0', intTime);
    const TodoData_Day_Sort = TodoData_Day.sorted('createTime');

    if (TodoData_Day_Sort.length === 0) {
      items.push({title: dateString, data: [{}]});
    } else {
      // items[data].push({a: 1});
      TodoData_Day_Sort.map((date) => {
        const Category = CategoryData.filtered('title == $0', date.categoryTitle);
        items.push({
          title: dateString,
          data: [
            {
              createTime: date.createTime,
              listContent: date.listContent,
              categoryTitle: date.categoryTitle,
              listTime: date.listTime,
              listDay: date.listDay,
              listPriority: date.listPriority,
              listMemo: date.listMemo,
              listClear: date.listClear,
              colors: Category[0].color,
            },
          ],
          hey: [
            TodoData_Day_Sort.map((test) => {
              a = 1;
            }),
          ],
        });
      });
    }
  }

  return items;
};
