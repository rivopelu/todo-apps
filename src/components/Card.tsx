import React from 'react';

interface ICard {
  className?: string,
  children: any
}

export const Card = ({children, className}: ICard) => {
  return (
    <div className={`bg-white  rounded-md  ${className}`}>{children}</div>
  )
}