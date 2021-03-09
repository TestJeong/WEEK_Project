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
