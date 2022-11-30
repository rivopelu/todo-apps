import React from 'react';
import {Card} from "./Card";
import {Badge, BadgeVariant} from "./Badge";
import SVG from "react-inlinesvg";
import {checkPriorityBadge, ToMediaUrl} from "../helper/utilsHelper";
import {ASSETS_CONSTANTS} from "../constants/assetsConstants";
import {IDetailsListTodo} from "../Redux/interfaceResponse";

interface IItemTodo {
  title?: string,
  priority?: string,
  onClickDelete?: any,
  onClickEdit?: any,
  onChangeChecklist?: any
  data: IDetailsListTodo
  dataCy : string
}

export const ItemTodo = ({priority, title, dataCy, onClickDelete, onClickEdit, onChangeChecklist, data}: IItemTodo) => {


  const valuePriority: BadgeVariant = checkPriorityBadge(priority ?? "")

  const itemCheckbox = () => {
    onChangeChecklist()
  }
  return (
    <Card dataCy={dataCy} className={"py-[26px] px-[28px] flex items-center justify-between shadow-md"}>
      <div className={"flex items-center gap-6"} >
        <input id="disabled-checkbox"
               data-cy={"todo-item-checkbox"}
               checked={data.is_active === 0}
               onChange={itemCheckbox}
               type="checkbox"
               className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cus:ring-blue-600 ng-offset-gray-800 focus:ring-2 -gray-700 "/>
        <div className={"flex gap-2 items-center"}>
          <Badge variant={valuePriority}/>
          <span data-cy={"todo-item-title"}
                className={`${data.is_active === 0 && "line-through text-gray-500"}`}> {title}</span>
          <button onClick={onClickEdit} data-cy={"todo-item-edit-button"}>
            <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_TODO_EDIT)}/>
          </button>
        </div>

      </div>
      <button type={"button"} onClick={onClickDelete} data-cy="todo-item-delete-button"
              className={"hover:bg-slate-50 active:bg-slate-100  duration-75 p-1 rounded-full "}>
        <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_TRASH)}/>
      </button>

    </Card>
  )
}