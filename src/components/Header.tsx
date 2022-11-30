import React from 'react';
import { MainContainer } from "./MainContainer";

export const Header = () => {
  return (
    <div data-cy="header-background" className={"bg-primary h-[105px] w-full z-[5000] fixed top-0 right-0"}>
      <MainContainer className={"h-full flex items-center"}>
        <div className={"text-3xl font-bold text-white uppercase"}><p data-cy="header-title">To Do List App</p></div>
      </MainContainer>
    </div>
  )
}