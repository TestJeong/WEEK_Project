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

export const Agenda_Call_Data = () => {
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  const AgendaData = realm.objects('TodoDataList');
  const CategoryData = realm.objects('CategoryList');

  let items = {};

  for (let i = -15; i < 85; i++) {
    const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);

    for (let el in AgendaData) {
      const Agenda_listDay = AgendaData[el].listDay;

      console.log('1', strTime);
      console.log('2', Agenda_listDay);

      if (strTime === Agenda_listDay) {
        /*   const TodoData_Day = AgendaData.filtered('listDay == $0', strTime);
        items[strTime] = [];
        TodoData_Day.map((date) => {
          const Category = CategoryData.filtered(
            'title == $0',
            date.categoryTitle,
          );
          items[strTime].push({
            name: date.listContent,
            colors: Category[0].color,
          });
        }); */
        /* items[strTime] = [{name: '있음'}]; */
      } else {
        /* items[strTime] = [{name: '없음'}]; */
      }
    }
  }

  console.log('?', items);

  return items;

  /* let items = {};

  for (let el in AgendaData) {
    const strTime = AgendaData[el].listDay;

    items[strTime] = [];
    const TodoData_Day = AgendaData.filtered('listDay == $0', strTime);

    TodoData_Day.map((date) => {
      const Category = CategoryData.filtered('title == $0', date.categoryTitle);
      items[strTime].push({name: date.listContent, colors: Category[0].color});
    });
  } */
};

export const All_Date = async () => {
  const APPLE = await Agenda_Call_Data();

  let day_Date = {};

  /* for (let i = -15; i < 85; i++) {
    const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);

    if (APPLE[strTime] === undefined) {
      day_Date[strTime] = [];
    } else {
      day_Date[strTime] = [];
      day_Date[strTime].push(APPLE[strTime]);
    }
  } */

  /* for (let i = -15; i < 85; i++) {
    const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);

    for(let el in AgendaData){
      const strTimes = AgendaData[el].listDay;

      if(strTime === strTimes) {
        console.log("일치 한느 것을 찾음")
      } else {
        console.log("못찾음.")
      }
    }

    if (APPLE[strTime] === undefined) {
      day_Date[strTime] = [];
    } else {
      day_Date[strTime] = [];
      day_Date[strTime].push(APPLE[strTime]);
    }
  } */

  return day_Date;
};

/* export const book_Delete = (term) => {
  const BookAll = realm.objects('User');
  const BookFil = BookAll.filtered('bookName == $0', term.item.bookName);

  const BookMark = realm.objects('SentenceStore');
  const BookMarkFil = BookMark.filtered('bookName == $0', term.item.bookName);

  realm.write(() => {
    realm.delete(BookFil);
    realm.delete(BookMarkFil);
  });
};

export const book_Basket_Delete = (term) => {
  const BookBasket_Data = realm.objects('BookBasket');
  const BookBasket_Filter = BookBasket_Data.filtered(
    'bookName == $0',
    term.item.bookName,
  );

  realm.write(() => {
    realm.delete(BookBasket_Filter);
  });
};

export const book_Basket_Move = (term) => {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day =
    year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + sec;

  realm.write(() => {
    realm.create(
      'User',
      {
        bookName: term.item.bookName,
        bookThumbnail: term.item.bookThumbnail,
        createtime: day,
      },
      true,
    );
  });
}; */
