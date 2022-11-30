import {MainReducers} from "./Reducers";
import {Dispatch} from "redux";
import {ActionInitType} from "../constants/ActionInitType";
import {requestDelete, requestGet, requestPatch, requestPost} from "../helper/fetchHelper";
import {UrlConstants} from "../constants/urlConstants";
import {createError} from "../helper/utilsHelper";

const {actions: action} = MainReducers



export const SetChecklistTodo = (id: string, data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(action.SetIsSuccessFetch({
      isSuccess: false,
      loading: true,
      actionInitType: ActionInitType.CHECKLIST_TODO
    }))
    await requestPatch(UrlConstants.EDIT_TODOS_DATA + id, data)
      .then(() => {
        dispatch(action.SetIsSuccessFetch({
          actionInitType: ActionInitType.CHECKLIST_TODO,
          loading: false,
          isSuccess: true
        }))
      })
      .catch((e) => {
        createError(e)
        dispatch(action.SetIsSuccessFetch({
          isSuccess: false,
          actionInitType: ActionInitType.CHECKLIST_TODO,
          loading: false,
        }))
      })
  }
}

export const EditTodoActions = (id: string, data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(action.SetIsSuccessFetch({
      isSuccess: false,
      loading: true,
      actionInitType: ActionInitType.EDIT_TODOS_DATA
    }))
    await requestPatch(UrlConstants.EDIT_TODOS_DATA + id, data)
      .then(() => {
        dispatch(action.SetIsSuccessFetch({
          actionInitType: ActionInitType.EDIT_TODOS_DATA,
          loading: false,
          isSuccess: true
        }))
      })
      .catch((e) => {
        createError(e)
        dispatch(action.SetIsSuccessFetch({
          actionInitType: ActionInitType.EDIT_TODOS_DATA,
          loading: false,
          isSuccess: false
        }))
      })
  }
}


export const CreateTodo = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(action.SetIsSuccessFetch({isSuccess: false, loading: true, actionInitType: ActionInitType.CREATE_TODOS}))
    await requestPost(UrlConstants.CREATE_TODOS, data)
      .then(() => {
        dispatch(action.SetIsSuccessFetch({
          isSuccess: true, loading: false, actionInitType: ActionInitType.CREATE_TODOS
        }))
      })
      .catch((e) => {
        createError(e)
        dispatch(action.SetIsSuccessFetch({
          loading: false, actionInitType: ActionInitType.CREATE_TODOS, isSuccess: false,
        }))
      })
  }
}

export const DeleteItemTodo = (id: number | string) => {
  return async (dispatch: Dispatch) => {
    dispatch(action.SetIsSuccessFetch({
      isSuccess: false,
      loading: true,
      actionInitType: ActionInitType.DELETE_DETAIL_LIST_TODO
    }))
    await requestDelete(UrlConstants.DELETE_TODO_LIST + id.toString())
      .then(() => {
        dispatch(action.SetIsSuccessFetch({
          isSuccess: true,
          loading: false,
          actionInitType: ActionInitType.DELETE_DETAIL_LIST_TODO
        }))
      })
      .catch((e) => {
        createError(e)
        dispatch(action.SetIsSuccessFetch({
          isSuccess: false,
          loading: false,
          actionInitType: ActionInitType.DELETE_DETAIL_LIST_TODO
        }))
      })
  }
}

export const GetDetailTodoList = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(action.SetDetailsTodoList({data: [], loading: true, actionInitType: ActionInitType.GET_DETAIL_LIST_TODO}))
    await requestGet(UrlConstants.GET_LIST_TODO + id.toString())
      .then((res) => {
        dispatch(action.SetDetailsTodoList({
          data: res.data,
          loading: false,
          actionInitType: ActionInitType.GET_DETAIL_LIST_TODO
        }))
      })
      .catch((e) => {
        createError(e);
        dispatch(action.SetDetailsTodoList({
          data: [],
          loading: false,
          actionInitType: ActionInitType.GET_DETAIL_LIST_TODO
        }))
      })
  }
}

export const AddNewItemActivityGroup = () => {
  const data = {
    title: "New Activity",
    email: "rivopelu12@gmail.com",
    _comment: "email digunakan untuk membedakan list data yang digunakan antar aplikasi"
  }
  return async (dispatch: Dispatch) => {
    dispatch(action.SetIsSuccessFetch({
      actionInitType: ActionInitType.ADD_NEW_ACTIVITY_GROUP,
      isSuccess: false,
      loading: true,
    }))
    await requestPost(UrlConstants.NEW_ACTIVITY_GROUP, data)
      .then(() => {
        dispatch(action.SetIsSuccessFetch({
          actionInitType: ActionInitType.ADD_NEW_ACTIVITY_GROUP,
          isSuccess: true,
          loading: false,
        }))
      })
      .catch((e) => {
        createError(e);
        dispatch(action.SetIsSuccessFetch({
          actionInitType: ActionInitType.ADD_NEW_ACTIVITY_GROUP,
          isSuccess: false,
          loading: false,
        }))
      })
  }
}

export const DeleteActivityGroup = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(action.SetIsSuccessFetch({
      actionInitType: ActionInitType.DELETE_ACTIVITY_GROUP,
      loading: true,
      isSuccess: false,
    }))
    await requestDelete(UrlConstants.DELETE_ACTIVITY_GROUP + id.toString())
      .then(() => {
        dispatch(action.SetIsSuccessFetch({
          actionInitType: ActionInitType.DELETE_ACTIVITY_GROUP,
          loading: false,
          isSuccess: true
        }))
      })
      .catch((e) => {
        createError(e)
        dispatch(action.SetIsSuccessFetch({
          actionInitType: ActionInitType.DELETE_ACTIVITY_GROUP,
          loading: false,
          isSuccess: false
        }))
      })
  }
}

export const GetListActivityGroup = () => {
  return async (dispatch: Dispatch) => {
    dispatch(action.SetListActivityGroup({
      actionInitType: ActionInitType.GET_LIST_ACTIVITY_GROUP,
      loading: true
    }))
    await requestGet(UrlConstants.GET_LIST_ACTIVITY_GROUP)
      .then((res) => {
        dispatch(action.SetListActivityGroup({
          data: res.data.data,
          loading: false,
          actionInitType: ActionInitType.GET_LIST_ACTIVITY_GROUP
        }))
      })
      .catch((e) => {
        createError(e);
        dispatch(action.SetListActivityGroup({
          actionInitType: ActionInitType.GET_LIST_ACTIVITY_GROUP,
          loading: false,
          data: []
        }))
      })
  }
}