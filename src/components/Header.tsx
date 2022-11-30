import React from 'react';
import { MainContainer } from "./MainContainer";

export const Header = () => {
  return (
    <div className={"bg-primary h-[105px] w-full z-[5000] fixed top-0 right-0"}>
      <MainContainer className={"h-full flex items-center"}>
        <h1 className={"text-3xl font-bold text-white uppercase"}>To Do List App</h1>
      </MainContainer>
    </div>
  )
}