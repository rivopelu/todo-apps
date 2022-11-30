import React, {useEffect, useState} from 'react';
import {MainContainer} from "../components/MainContainer";
import {BtnVariant, Button} from "../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {ItemCard} from "../components/ItemCard";
import {useDispatch, useSelector} from "react-redux";
import {AddNewItemActivityGroup, DeleteActivityGroup, GetListActivityGroup} from "../Redux/Actions";
import {RootState} from "../Redux/store";
import {IListActivityGroup} from "../Redux/interfaceResponse";
import {toDateString, ToMediaUrl} from "../helper/utilsHelper";
import {ASSETS_CONSTANTS} from "../constants/assetsConstants";
import {Modal} from "../components/Modal";
import SVG from "react-inlinesvg";
import {ActionInitType} from "../constants/ActionInitType";
import {Card} from "../components/Card";
import {Spiner} from "../components/Spiner";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState<IListActivityGroup[]>([])
  const {MainReducers} = useSelector((state: RootState) => state);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number | undefined>(undefined);
  const [titleDelete, setTitleDelete] = useState<string | undefined>(undefined);
  const [isAlertSuccessDelete, setIsAlertSuccessDelete] = useState<boolean>(false);
  const [isLoadingAddNew, setIsLoadingAddNew] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (MainReducers.listActivityGroup) {
      setDataList(MainReducers.listActivityGroup)
    }
  }, [MainReducers])

  useEffect(() => {
    if (MainReducers.isSuccessFetch && MainReducers.actionIntiType === ActionInitType.DELETE_ACTIVITY_GROUP) {
      dispatch(GetListActivityGroup() as never)
      setOpenModalDelete(false)
      setIsAlertSuccessDelete(true)
    }
    if (MainReducers.isSuccessFetch && MainReducers.actionIntiType === ActionInitType.ADD_NEW_ACTIVITY_GROUP) {
      dispatch(GetListActivityGroup() as never)
    }
  }, [MainReducers.isSuccessFetch])


  useEffect(() => {
    if (MainReducers.loading && MainReducers.actionIntiType === ActionInitType.ADD_NEW_ACTIVITY_GROUP) {
      setIsLoadingAddNew(MainReducers.loading)
    } else if (!MainReducers.loading && MainReducers.actionIntiType === ActionInitType.ADD_NEW_ACTIVITY_GROUP) {
      setIsLoadingAddNew(MainReducers.loading)
    }
  }, [MainReducers])
  useEffect(() => {
    dispatch(GetListActivityGroup() as never);
  }, [])

  const onDeleteClick = (id?: number, title?: string) => {
    setOpenModalDelete(true);
    setTitleDelete(title)
    setIdDelete(id)
  }

  const onCancelModal = () => {
    setOpenModalDelete(false);
  }


  const onOkeModal = () => {
    dispatch(DeleteActivityGroup(idDelete ?? 0) as never);
  }


  const onClickOverlay = () => {
    setIsAlertSuccessDelete(false)
  }
  const bodyModal =
    <div className={"w-full flex flex-col items-center justify-center max-w-[365px]"}>
      <SVG data-cy={"modal-delete-icon"} src={ToMediaUrl(ASSETS_CONSTANTS.IC_WARNING_DELETE)}/>
      <div className={"w-full text-center"}>
        <h1 data-cy={"modal-delete-title"}>Apakah anda yakin menghapus activity <strong>“{titleDelete}”?</strong></h1>
      </div>
    </div>


  const customModalSuccessDelete =
    <>
      <Card className={"py-[20px] px-[30px] w-[490px] flex gap-2 items-center "}>
        <SVG data-cy={"modal-information-icon"} src={ToMediaUrl(ASSETS_CONSTANTS.IC_INFO)}/>
        <span data-cy="modal-information-title"
              className={"text-sm font-bold text-[#111111]"}>Activity berhasil dihapus</span>
      </Card>
    </>

  const onClickNewItem = () => {
    dispatch(AddNewItemActivityGroup() as never)
  }

  return (
    <div className={"h-full"}>
      <Modal
        closeIconCy={""}
        buttonOkeCy={""}
        buttonCancelCy={""}
        title={""}
        dataCy={"modal-information"}
        show={isAlertSuccessDelete}
        customModal={customModalSuccessDelete}
        onClickOverlay={onClickOverlay}/>
      <Modal
        dataCy={"modal-delete"}
        closeIconCy={""}
        buttonOkeCy={"modal-delete-confirm-button"}
        buttonCancelCy={"modal-delete-cancel-button"}
        show={openModalDelete}
        body={bodyModal}
        okBtnVariant={BtnVariant.RED}
        onCancel={onCancelModal}
        onOke={onOkeModal}
      />

      <MainContainer className={"mt-[40px] h-full"}>
        <div className={"flex w-full items-center justify-between"}>
          <h1 data-cy="activity-title" className={"text-3xl font-extrabold"}>Activity</h1>
          <Button dataCy="activity-add-button" className={"flex items-center gap-2 duration-200"}
                  onClick={onClickNewItem}>
            <>
              {
                isLoadingAddNew ?
                  <Spiner className={"w-6 h-6"}/> :
                  <FontAwesomeIcon icon={faPlus}/>
              }
              <span>Tambah</span>
            </>
          </Button>
        </div>
        <div className={"h-full "}>
          {
            dataList.length > 0 ?
              <div className={"flex  w-full  flex-wrap mt-7"}>
                {
                  dataList.map((item, i) => (
                      <div key={i} className={"w-[25%] pt-5"}>
                        <ItemCard dataCy={`activity-item`} onClick={() => navigate("/detail/" + item.id)}
                                  onClickDelete={() => onDeleteClick(item.id, item.title)} title={item.title}
                                  date={toDateString(item.created_at ?? "")}/>
                      </div>
                    )
                  )
                }
              </div> :
              <div className={"h-full items-center w-full justify-center  flex mt-28"}>
                <SVG data-cy="activity-empty-state" src={ToMediaUrl(ASSETS_CONSTANTS.EMPTY_STATE)}/>
              </div>
          }
        </div>
      </MainContainer>
    </div>
  )
}
