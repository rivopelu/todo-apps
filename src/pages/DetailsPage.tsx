import React, { useEffect, useRef, useState } from 'react';
import { MainContainer } from "../components/MainContainer";
import SVG from "react-inlinesvg";
import { ToMediaUrl } from "../helper/utilsHelper";
import { ASSETS_CONSTANTS } from "../constants/assetsConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BtnVariant, Button } from "../components/Button";
import { ItemTodo } from "../components/ItemTodo";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateTodo, DeleteItemTodo, EditTodoActions, GetDetailTodoList, SetChecklistTodo } from "../Redux/Actions";
import { RootState } from "../Redux/store";
import { IDetailsListTodo } from "../Redux/interfaceResponse";
import { Modal } from "../components/Modal";
import { ActionInitType } from "../constants/ActionInitType";
import { IValueSelect, SelectCustoms } from "../components/SelectCustoms";
import { BadgeVariant, BadgeWithTitle } from "../components/Badge";
import { ITodoDetails } from "../Redux/Reducers";
import { log } from "util";
import { requestPatch, requestPost } from "../helper/fetchHelper";
import { UrlConstants } from "../constants/urlConstants";
import {Card} from "../components/Card";

export interface IDataNewTodo {
  activity_group_id: number
  title: string
  priority: string
  _comment: string
}

export interface IDataEditTodo {
  title: string
  is_active: number
  priority: string
  _comment: string
}

export interface IDataMenuSort {
  id: string,
  title: string,
  icon: string,
  onClick?: any,
}

export const DetailsPage = () => {

  const { MainReducers } = useSelector((state: RootState) => state);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onEditTitle, setOnEditTitle] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>("")
  const [list, setList] = useState<IDetailsListTodo[]>([])
  const [openModalDelete, setOnOpenModalDelete] = useState<boolean>(false)
  const [titleDelete, setTitleDelete] = useState<string>("")
  const [idDelete, setIdDelete] = useState<string>("")
  const [isOpenModalNew, setIsOpenModalNew] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [itemsId, setItemsId] = useState<number>(0)
  const [isActiveItems, setIsActiveItems] = useState<number>(1)
  const [isActiveMenuSort, setIsActiveMenuSort] = useState<boolean>(false)
  const [valuePriorityEdit, setValuePriorityEdit] = useState<string>("");
  const [valuePrioritySubmit, setValuePrioritySubmit] = useState<string>("")
  const [isActiveSortId, setIsActiveSortId] = useState<string>("sort-latest")
  const [isAlertSuccessDelete, setIsAlertSuccessDelete] = useState<boolean>(false);
  const [detailGroup, setDetailGroup] = useState<ITodoDetails>({
    todo_items: [],
    title: "",
    id: 0,
    created_at: ""
  })

  const [valueTitle, setValueTitle] = useState<string>("")
  const [valuePriority, setValuePriority] = useState<IValueSelect>({
    value: "",
    label: "",
  });

  const sortUnFinished = () => {
    return list.slice().sort(function (a, b) {
      return parseFloat(String(a.is_active)) - parseFloat(String(b.is_active));
    })
  }

  const sortAz = () => {
    return list.slice().sort(function (a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  const sortLatest = () => {
    setIsActiveSortId("sort-latest")
    setList(MainReducers.detailActivityInfo?.todo_items ? MainReducers.detailActivityInfo.todo_items : [])
  }

  const setOldest = () => {
    setIsActiveSortId("sort-oldest")
    setList(MainReducers.detailActivityInfo?.todo_items ? MainReducers.detailActivityInfo.todo_items.slice().reverse() : [])
  }


  const dataMenuSort: IDataMenuSort[] = [
    {
      title: "Terbaru",
      icon: ASSETS_CONSTANTS.IC_SORT_LATEST,
      id: "sort-selection-0",
      onClick: () => sortLatest()
    },
    {
      title: "Terlama",
      icon: ASSETS_CONSTANTS.IC_SORT_OLDEST,
      id: "sort-selection-1",
      onClick: () => setOldest()
    },
    {
      title: "A-Z", icon: ASSETS_CONSTANTS.IC_SORT_AZ,
      id: "sort-selection-2", onClick: () => {
        setList(sortAz())
        setIsActiveSortId("sort-az")
      }
    },
    {
      title: "Z-A", icon: ASSETS_CONSTANTS.IC_SORT_ZA,
      id: "sort-selection-3", onClick: () => {
        setIsActiveSortId("sort-selection-")
        setList(sortAz().reverse())
      }
    },
    {
      title: "Belum Selesai",
      icon: ASSETS_CONSTANTS.IC_SORT_UNFINISHED,
      id: "sort-selection-4",
      onClick: () => {
        setIsActiveSortId("sort-selection-")
        setList(sortUnFinished().reverse())
      }
    },
  ]


  useEffect(() => {
    dispatch(GetDetailTodoList(params.id ?? "") as never)
  }, [])
  useEffect(() => {
    if (MainReducers.isSuccessFetch && MainReducers.actionIntiType === ActionInitType.DELETE_DETAIL_LIST_TODO) {
      dispatch(GetDetailTodoList(params.id ?? "") as never)
      setIsAlertSuccessDelete(true)
      setOnOpenModalDelete(false)
      // eslint-disable-next-line no-mixed-operators
    } else if (MainReducers.isSuccessFetch && MainReducers.actionIntiType === ActionInitType.EDIT_TODOS_DATA || MainReducers.isSuccessFetch && MainReducers.actionIntiType === ActionInitType.CREATE_TODOS || MainReducers.isSuccessFetch && MainReducers.actionIntiType === ActionInitType.CHECKLIST_TODO) {
      dispatch(GetDetailTodoList(params.id ?? "") as never)
    } else if (MainReducers.detailActivityInfo?.todo_items) {
      setList(MainReducers.detailActivityInfo.todo_items)
      setDetailGroup({
        todo_items: [],
        title: MainReducers.detailActivityInfo.title,
        id: MainReducers.detailActivityInfo.id,
        created_at: MainReducers.detailActivityInfo.created_at
      })
      setValue(MainReducers.detailActivityInfo.title)
    }

  }, [MainReducers]
  )


  const onChangeInput = (e: any) => {
    setValue(e.target.value)
  }

  const onUpdateTitle = async () => {
    setOnEditTitle(false)
    console.log("update ----------------------------")
    const data = {
      title: value
    }
    await requestPatch(UrlConstants.UPDATE_TITLE + params.id, data)
  }

  const clickEdit = () => {
    setOnEditTitle(true);
  }

  const checkSeleckValue = (value: string): IValueSelect => {
    switch (value) {
      case "high":
        return { label: <BadgeWithTitle variant={BadgeVariant.HIGH} />, value: "high" }
        break;
      case "normal":
        return { label: <BadgeWithTitle variant={BadgeVariant.MEDIUM} />, value: "normal" }
        break;
      case "low":
        return { label: <BadgeWithTitle variant={BadgeVariant.LOW} />, value: "low" }
        break;
      case "very-low":
        return { label: <BadgeWithTitle variant={BadgeVariant.VERY_LOW} />, value: "very-low" }
        break
      default:
        return { label: <BadgeWithTitle variant={BadgeVariant.VERY_HIGH} />, value: "very-high" }
    }
  }




  const onClickDelete = (id: string, title: string) => {
    setOnOpenModalDelete(true)
    setTitleDelete(title)
    setIdDelete(id)

    // dispatch(DeleteItemTodo(id) as never)
  }
  const onCancelModal = () => {
    setOnOpenModalDelete(false);
    setIsOpenModalNew(false)
  }

  const OnOkeModal = () => {
    dispatch(DeleteItemTodo(idDelete) as never)
  }

  const onClickEditTodo = (e: IDetailsListTodo) => {
    setIsEdit(true);
    setItemsId(e.id)
    setValueTitle(e.title)
    setIsActiveItems(e.is_active)
    setValuePriority(checkSeleckValue(e.priority))
    setIsOpenModalNew(true);
  }

  const onClickNewTodo = () => {
    setIsEdit(false)
    setIsOpenModalNew(true)
    setValuePriority({
      value: "",
      label: "",
    })
    setValueTitle("")
  }
  const OnOkeModalSubmit = () => {
    setIsOpenModalNew(false)
    if (valueTitle) {
      if (isEdit) {
        const data: IDataEditTodo = {
          title: valueTitle,
          priority: valuePriorityEdit ?? "",
          is_active: isActiveItems,
          _comment: "-"
        }
        dispatch(EditTodoActions(itemsId.toString(), data) as never)

      } else {
        const data: IDataNewTodo = {
          _comment: "_",
          priority: valuePrioritySubmit ?? "",
          activity_group_id: parseInt(params.id ?? "10"),
          title: valueTitle
        }
        dispatch(CreateTodo(data) as never)
      }
    }
  }

  const onChangeChecklist = (item: IDetailsListTodo) => {
    const data: IDataEditTodo = {
      title: item.title,
      _comment: "-",
      is_active: item.is_active === 1 ? 0 : 1,
      priority: item.priority
    }
    dispatch(SetChecklistTodo(item.id.toString(), data) as never)
  }

  const bodyModal =
    <div className={"w-full flex flex-col items-center justify-center max-w-[365px]"}>
      <SVG data-cy={"modal-delete-icon"} src={ToMediaUrl(ASSETS_CONSTANTS.IC_WARNING_DELETE)}/>
      <div className={"w-full text-center"}>
        <h1 data-cy={"modal-delete-title"}>Apakah anda yakin menghapus item <strong>“{titleDelete}”?</strong></h1>
      </div>
    </div>


  const bodyModalNew =
    <div className={"w-[830px] flex flex-col gap-4 px-10"}>
      <div className={"flex flex-col gap-2"}>
        <label data-cy={"modal-add-name-title"} className={"text-xs font-bold text-black"} htmlFor={"input_item"}>NAMA
          LIST ITEM</label>
        <input data-cy={"modal-add-name-input"} value={valueTitle} onChange={(e: any) => setValueTitle(e.target.value)}
               type="text" id={"input_item"}
               placeholder={"Tambahkan nama list item"}
               className={"border py-2 px-3 rounded-md focus:outline-primary"}/>
      </div>
      <div>
        <label data-cy={"modal-add-priority-title"} className={"text-xs font-bold text-black"}
               htmlFor={"input_item"}>PRIORITY</label>
        <div className={"w-[205px] mt-1"}>
          <SelectCustoms setValuePrioritySubmit={setValuePrioritySubmit} setValuePriorityEdit={setValuePriorityEdit}
                         valuePriority={valuePriority} setValuePriority={setValuePriority}/>
        </div>
      </div>
    </div>

  const filter =
    <div className={"relative "}>
      <button
        data-cy="todo-sort-button"
        onClick={() => setIsActiveMenuSort(!isActiveMenuSort)}
        className={"justify-center rounded-full h-[54px] w-[54px] flex items-center border border-slate-300  bg-[#E5E5E5] "}>
        <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_ARROW_SORT)}/>
      </button>
      {
        isActiveMenuSort &&
				<div className={"absolute bg-white mt-3 w-[235px] shadow-md rounded-lg"} data-cy={"sort-selection"}>
          {
            dataMenuSort.map((data) => (
              <button
                onClick={data.onClick}
                key={data.id}
                data-cy={data.id}
                className={"py-[14px] px-[22px] flex border cursor-pointer hover:bg-slate-100 duration-75 justify-between"}>

                <div
                  className={"flex items-center gap-3"}>

                  <SVG src={ToMediaUrl(data.icon)} />
                  <span>{data.title}</span>
                </div>
                {
                  data.id === isActiveSortId &&
                  <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_SORT_CHECKLIST)} />
                }
              </button>
            ))
          }
        </div>
      }
    </div>
  const customModalSuccessDelete =
    <>
      <Card dataCy={"modal-information"} className={"py-[20px] px-[30px] w-[490px] flex gap-2 items-center "}>
        <SVG data-cy={"modal-information-icon"} src={ToMediaUrl(ASSETS_CONSTANTS.IC_INFO)}/>
        <span data-cy="modal-information-title"
              className={"text-sm font-bold text-[#111111]"}>item berhasil dihapus</span>
      </Card>
    </>
  return (
    <section className={"h-full "}>
      <Modal
        closeIconCy={""}
        buttonOkeCy={""}
        buttonCancelCy={""}
        title={""}
        dataCy={""}
        show={isAlertSuccessDelete}
        customModal={customModalSuccessDelete}
        onClickOverlay={() => setIsAlertSuccessDelete(false)}/>
      <Modal
        closeIconCy={""}
        dataCy={'modal-delete'}
        buttonCancelCy={"modal-delete-cancel-button"}
        buttonOkeCy={"modal-delete-confirm-button"}
        show={openModalDelete}
        body={bodyModal}
        okBtnVariant={BtnVariant.RED}
        onCancel={onCancelModal}
        onOke={OnOkeModal}
      />
      <Modal
        disabledOkeBtn={valueTitle.length < 1 && true}
        closeIconCy={"modal-add-close-button"}
        buttonCancelCy={""}
        buttonOkeCy={"modal-add-save-button"}
        dataCy={"modal-add"}
        title={"Tambah List Item"}
        titleClassName={"px-10 py-4"}
        footerClassName={"px-10 flex-row-reverse border-t"}
        show={isOpenModalNew}
        body={bodyModalNew}
        cancelClassName={"hidden"}
        okBtnVariant={BtnVariant.PRIMARY}
        onCancel={onCancelModal}
        onOke={OnOkeModalSubmit}
      />
      <MainContainer className={"mt-[40px] h-full"}>
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center"}>
            <div className={"cursor-pointer"} data-cy="todo-back-button" onClick={() => navigate("/")}>
              <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_BACK_BTN)}/>
            </div>
            {
              !onEditTitle ?
                <div data-cy="todo-title" onClick={clickEdit} className={"text-3xl font-bold "}><p>{value}</p></div> :
                <form>
                  <input
                    autoFocus={true}
                    type="text"
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        onUpdateTitle().then()
                      }
                    }
                    }
                    className={"text-3xl font-bold bg-transparent  w-fit outline-0 border-b-2 border-black"}
                    value={value} onChange={onChangeInput} onBlur={onUpdateTitle}/>
                </form>
            }
            <button className={"ml-4 "} onClick={clickEdit}>
              <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_PENCIL)}/>
            </button>
          </div>
          <div className={"flex items-center justify-between gap-2"}>
            {filter}
            <Button dataCy={"todo-add-button"} className={"flex items-center gap-2 duration-200 px-10"}
                    onClick={onClickNewTodo}>
              <>
                <FontAwesomeIcon icon={faPlus}/>
                <span>Tambah</span>
              </>
            </Button>
          </div>
        </div>

        <div className={"mt-[54px] w-full flex flex-col gap-3 "}>
          {
            list.map((item, i) => (
              <div key={i}>
                <ItemTodo
                  dataCy={"todo-item-" + i.toString()}
                  data={item}
                  onChangeChecklist={() => onChangeChecklist(item)}
                  onClickEdit={() => {
                    const data: IDetailsListTodo = {
                      title: item.title,
                      id: item.id,
                      activity_group_id: item.activity_group_id,
                      priority: item.priority,
                      is_active: item.is_active
                    }
                    onClickEditTodo(data)
                  }}
                  onClickDelete={() => onClickDelete(item.id.toString(), item.title)}
                  title={item.title}
                  priority={item.priority} />
              </div>
            ))
          }
        </div>
        {
          list.length === 0 && !MainReducers.loading &&
          <div className={"h-full items-center w-full justify-center  flex mt-28"}>
            <img data-cy="todo-empty-state" src={ToMediaUrl(ASSETS_CONSTANTS.TODO_EMPTY_STATE)} alt="empty state"/>
          </div>
        }
      </MainContainer>
    </section>
  )
}