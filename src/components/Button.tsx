import React, {ReactElement} from 'react';

export enum BtnVariant {
  RED, PRIMARY, GRAY,
}

interface IBtn {
  children: ReactElement | string,
  className?: string
  onClick?: any,
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: BtnVariant
  dataCy : string
}

export const Button = ({children, className, onClick, type, variant, dataCy}: IBtn) => {
  if (variant === BtnVariant.GRAY) {
    return (
      <button data-cy={dataCy} type={type ?? "button"} onClick={onClick}
              className={`bg-grayLight px-7 py-3 rounded-full  hover:bg-slate-200 duration-200 active:bg-slate-100 text-darkBlack font-bold ${className}`}>{children}</button>
    )
  } else if (variant === BtnVariant.RED) {

    return (
      <button data-cy={dataCy} type={type ?? "button"} onClick={onClick}
              className={`bg-mainRed px-7 py-3 rounded-full text-white hover:bg-red-600 duration-200 active:bg-red1-400 font-bold ${className}`}>{children}</button>
    )
  } else {
    return (
      <button data-cy={dataCy} type={type ?? "button"} onClick={onClick}
              className={`bg-primary px-7 py-3 rounded-full text-white hover:bg-sky-500 duration-200 active:bg-sky-400 font-bold ${className}`}>{children}</button>
    )
  }
}