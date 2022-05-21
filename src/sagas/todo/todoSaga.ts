import realm from '@/db';

export const ToDoList_View_Delete = (term: any) => {
  const BookMarkD = realm.objects('TodoDataList');
  const BookMarkaa = BookMarkD.filtered('listContent == $0', term.item.listContent);
  realm.write(() => {
    realm.delete(BookMarkaa);
  });
};
