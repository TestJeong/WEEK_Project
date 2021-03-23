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

  for (let i = -15; i < 30; i++) {
    const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    const intTime = Number(strTime.replace(/-/g, ''));

    const TodoData_Day = AgendaData.filtered('listDay == $0', intTime);

    if (TodoData_Day.length === 0) {
      items[strTime] = [];
    } else {
      items[strTime] = [];
      TodoData_Day.map((date) => {
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
