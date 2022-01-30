export interface categoryData {
  color: string;
  createTime: string; // 2022-1-25-22-48-51
  title: string;
  todoData: [];
}

export interface todoDataType {
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
