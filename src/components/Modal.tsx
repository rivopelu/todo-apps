import React from 'react';
import {Card} from "./Card";
import {BtnVariant, Button} from "./Button";
import SVG from "react-inlinesvg";
import {ToMediaUrl} from "../helper/utilsHelper";
import {ASSETS_CONSTANTS} from "../constants/assetsConstants";

interface IModal {
  onOke?: any,
  cancelClassName?: string,
  okClassName?: string,
  show?: boolean,
  onCancel?: any,
  okTitle?: string,
  cancelTitle?: string,
  body?: any,
  title?: string,
  titleClassName?: string,
  cancelBtnVariant?: BtnVariant,
  okBtnVariant?: BtnVariant,
  customModal?: any;
  onClickOverlay?: any,
  footerClassName?: string
}

interface IModalSec {
  titleCard: string
}

export const Modal = ({
                        body,
                        cancelClassName,
                        titleClassName,
                        cancelTitle,
                        onCancel,
                        okTitle,
                        title,
                        okClassName,
                        show,
                        onOke,
                        cancelBtnVariant,
                        okBtnVariant,
                        customModal,
                        onClickOverlay,
                        footerClassName
                      }: IModal) => {

  const FooterQuestion = () => {
    return (
      <div className={`p-3 gap-3 flex items-center px-20 justify-between w-full ${footerClassName}`}>
        <Button onClick={onCancel}
          // variant={"red"}
                variant={cancelBtnVariant ?? BtnVariant.GRAY}
                className={`w-1/2 capitalize  ${cancelClassName}`}>{cancelTitle ?? "Cancel"}</Button>
        <Button onClick={onOke} type={"submit"} variant={okBtnVariant}
                className={`w-1/2 capitalize ${okClassName}`}>{okTitle ?? "Oke"}</Button>
      </div>
    )
  }

  const TitleCard = ({titleCard}: IModalSec) => {
    return (
      <div className={`p-3 border-b ${titleClassName} flex w-full justify-between items-center`}>
        <p className='font-bold text-xl font-semibold'>{titleCard}</p>
        <button onClick={onCancel}>
          <SVG src={ToMediaUrl(ASSETS_CONSTANTS.IC_CLOSE)}/>
        </button>
      </div>
    )
  }

  return (
    <>

      <div
        onClick={onClickOverlay}
        className={`w-screen h-screen top-0 left-0 bg-black/30 flex items-center justify-center fixed duration-500 ${show ? 'opacity-100 z-[10000] ' : 'opacity-0 z-[-10000] '} `}>
        {customModal ?
          customModal :
          <Card
            className={`min-w-[500px] min-h-[] max-w-[1000px] duration-500 ${show ? 'translate-y-0 scale-100' : 'translate-y-[200vh] scale-0 '}`}>
            {
              title &&
							<TitleCard titleCard={title}/>
            }
            <Card
              className={`w-full p-3 min-h-[250px]  flex flex-col  max-h-[80vh] items-center justify-center `}>
              {
                show &&
                body
              }
            </Card>

            <FooterQuestion/>
          </Card>
        }
      </div>
    </>

  )
}