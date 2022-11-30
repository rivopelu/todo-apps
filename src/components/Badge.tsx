import React from 'react';

export enum BadgeVariant {
  VERY_HIGH, HIGH, MEDIUM, LOW, VERY_LOW
}

interface IBadge {
  variant: BadgeVariant
}

export const Badge = ({variant}: IBadge) => {
  switch (variant) {
    case BadgeVariant.VERY_HIGH:
      return <div className={"h-[14px] rounded-full w-[14px] bg-mainRed"}></div>
      break;
    case BadgeVariant.HIGH :
      return <div className={"h-[14px] rounded-full w-[14px] bg-mainOrange"}></div>
      break;
    case BadgeVariant.MEDIUM :
      return <div className={"h-[14px] rounded-full w-[14px] bg-mainGreen"}></div>
      break;
    case BadgeVariant.LOW :
      return <div className={"h-[14px] rounded-full w-[14px] bg-blueBadge"}></div>
      break;
    case BadgeVariant.VERY_LOW :
      return <div className={"h-[14px] rounded-full w-[14px] bg-purpleBadge"}></div>
      break;


  }

}


export const BadgeWithTitle = ({variant}: IBadge) => {
  switch (variant) {
    case BadgeVariant.VERY_HIGH:
      return <div className={"flex items-center gap-2 text-xs"}>
        <div className={"h-[14px] rounded-full w-[14px] bg-mainRed"}></div>
        <span>Very High</span>
      </div>
      break;
    case BadgeVariant.HIGH :
      return <div className={"flex items-center gap-2 text-xs"}>
        <div className={"h-[14px] rounded-full w-[14px] bg-mainOrange"}></div>
        <span>High</span>
      </div>
      break;
    case BadgeVariant.MEDIUM :
      return <div className={"flex items-center gap-2 text-xs"}>
        <div className={"h-[14px] rounded-full w-[14px] bg-mainGreen"}></div>
        <span>Medium</span>
      </div>
      break;
    case BadgeVariant.LOW :
      return <div className={"flex items-center gap-2 text-xs"}>
        <div className={"h-[14px] rounded-full w-[14px] bg-blueBadge"}></div>
        <span>Low</span>
      </div>
      break;

   case BadgeVariant.VERY_LOW :
      return <div className={"flex items-center gap-2 text-xs"}>
        <div className={"h-[14px] rounded-full w-[14px] bg-purpleBadge"}></div>
        <span>Very Low</span>
      </div>
      break;


  }

}