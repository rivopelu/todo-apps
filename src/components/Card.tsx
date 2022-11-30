import React from 'react';

interface ICard {
  className?: string,
  children: any,
  dataCy ?: string
}

export const Card = ({children, className, dataCy}: ICard) => {
  return (
    <div data-cy={dataCy} className={`bg-white  rounded-md  ${className}`}>{children}</div>
  )
}