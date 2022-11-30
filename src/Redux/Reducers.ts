import {IListActivityGroup} from "./interfaceResponse";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IInitState {
  listActivityGroup?: IListActivityGroup[]
  loading: boolean,
  actionIntiType: string,
  isSuccessFetch?: boolean
  detailActivityInfo?: ITodoDetails

}

export interface ITodoDetails {
  id: number
  title: string
  created_at: string
  todo_items?: any
}

const initState: IInitState = {
  listActivityGroup: [],
  loading: false,
  actionIntiType: "",
  isSuccessFetch: false,
  detailActivityInfo: undefined

}

export interface IPayload {
  loading: boolean;
  actionInitType: string
  data?: any;
  isSuccess?: boolean
}

export const MainReducers = createSlice({
  name: "mainReducers",
  initialState: initState,
  reducers: {
    SetListActivityGroup: (state, action: PayloadAction<IPayload>) => {
      return {
        ...state,
        actionIntiType: action.payload.actionInitType,
        listActivityGroup: action.payload.data,
        loading: action.payload.loading
      }
    },
    SetIsSuccessFetch: (state, action: PayloadAction<IPayload>) => {
      return {
        ...state,
        actionIntiType: action.payload.actionInitType,
        loading: action.payload.loading,
        isSuccessFetch: action.payload.isSuccess,
      }
    },
    SetDetailsTodoList: (state, action: PayloadAction<IPayload>) => {
      return {
        ...state,
        loading: action.payload.loading,
        detailActivityInfo: action.payload.data,
        actionIntiType: action.payload.actionInitType
      }
    }
  }
})