import axios from "axios";

export const requestGet = (url: string) => {
  return axios.get(url);
};

export const requestDelete = (url: string) => {
  return axios.delete(url)
}

export const requestPost = (url: string, data: any) => {
  return axios.post(url, data,)
}

export const requestPatch = (url : string, data : any) => {
  return axios.patch(url, data);
}