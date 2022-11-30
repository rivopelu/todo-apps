import axios from "axios";
import swal from "sweetalert"
import {BadgeVariant} from "../components/Badge";

export const ToMediaUrl = (pathname: string) =>
  `${process.env.PUBLIC_URL}/assets/${pathname}`;

export const setCapitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);


export const createError = (error: Error, title?: string) => {
  let message;
  if (axios.isAxiosError(error) && error.response) {
    message = error.response.data.message;
  } else message = String(error);
  const titleMessage = () => {
    if (title) {
      return title;
    }
    return 'Gagal';
  };
  return swal(titleMessage(), setCapitalize(message), 'error');
};


export const toDateString = (time: string): string => {
  const date = new Date(time)
  let options: any = {year: 'numeric', month: 'long', day: 'numeric'};
  return (date.toLocaleDateString("id-ID", options))
}

// very-high, high, normal, low, very-low

export const checkPriorityBadge = (item: string): BadgeVariant => {
  switch (item) {
    case "high" :
      return BadgeVariant.HIGH
      break;
    case "normal" :
      return BadgeVariant.MEDIUM
      break;
    case "low" :
      return BadgeVariant.LOW
      break;
    case "very-low" :
      return BadgeVariant.VERY_LOW
      break;
    default :
      return BadgeVariant.VERY_HIGH
  }
}