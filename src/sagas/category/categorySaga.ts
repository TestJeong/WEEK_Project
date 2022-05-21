import realm from '@/db';

export const Category_List_View_Delete = (term: any) => {
  realm.write(() => {
    const Category_List = realm.objects('CategoryList');
    const Category_List_Data = Category_List.filtered('title == $0', term.title);

    const TodoList_View = realm.objects('TodoDataList');
    const TodoList_View_Data = TodoList_View.filtered('categoryTitle == $0', term.title);

    realm.delete(TodoList_View_Data);
    realm.delete(Category_List_Data);
  });
};
