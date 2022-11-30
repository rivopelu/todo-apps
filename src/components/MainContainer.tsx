import React from 'react';

interface IMainContainer {
  children: any
  className?: string
}

export const MainContainer = ({children, className}: IMainContainer) => {
  return (
    <div className={`max-w-5xl  mx-auto ${className}`}>
      {children}
    </div>
  )
}