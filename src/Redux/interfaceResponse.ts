export interface IListActivityGroup {
  id?: number
  title?: string
  created_at?: string
}


export interface IDetailsListTodo {
  id: number
  title: string
  activity_group_id: number
  is_active: number
  priority: string
}