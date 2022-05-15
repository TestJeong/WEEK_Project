export interface CategoryItemType {
  color: string;
  createTime: number; // 2022-1-25-22-48-51
  title: string;
  todoData: [];
}

export interface TodoDataType {
  categoryTitle: string;
  createTime: string; // "2022-1-25-22-49-2"
  id: number;
  listClear: boolean;
  listContent: string;
  listDay: number; //20220125
  listEnabled: boolean;
  listMemo: string;
  listPriority: number;
  listTime: string;
  listTime_Data: string;
}

// 투두 디테일 페이지에서 카테고리 변경 타입
export interface CategoryListType {
  Category_Data: {
    index: number;
    item: CategoryItemType;
  };
}
