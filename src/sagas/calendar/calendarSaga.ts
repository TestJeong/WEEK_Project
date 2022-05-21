import realm from '@/db';

export const Agenda_Call_Data = (term) => {
  // const timeToString = (time) => {
  //   const date = new Date(time);

  //   const dates = new Date(date - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];

  //   return dates;
  // };
  const AgendaData = realm.objects<any>('TodoDataList');
  const CategoryData = realm.objects<any>('CategoryList');

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
      let todoDataArray = [];
      TodoData_Day_Sort.map((date) => {
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
