import React from 'react';
import SVG from "react-inlinesvg";
import { ToMediaUrl } from "../helper/utilsHelper";
import { ASSETS_CONSTANTS } from "../constants/assetsConstants";

interface IItemCard {
  title?: string,
  date?: string,
  onClickDelete?: any,
  onClick?: any,
  dataCy: string;
}

export const ItemCard = ({ title, dataCy, date, onClickDelete, onClick }: IItemCard) => {
  return (
    <div className='relative' data-cy={dataCy}>
      <div  onClick={onClick} className={"bg-white w-[235px] h-[234px] rounded-md shadow-md p-[22px] flex flex-col justify-between"}>
        <h1 data-cy="activity-item-title" className={"text-lg font-bold capitalize"}>{title}</h1>
        <div className={"flex w-full items-center justify-between"}>
          <span data-cy="activity-item-date" className={"text-sm text-textGray"}>{date}</span>

        </div>
      </div>
      <button data-cy="activity-item-delete-button" type={"button"} onClick={onClickDelete}
        className={"hover:bg-slate-50 active:bg-slate-100  duration-75 p-1 rounded-full absolute right-8 bottom-5 "}>
        <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_TRASH)} />
      </button>
    </div>

  )
}