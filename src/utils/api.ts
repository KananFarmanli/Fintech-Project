
import axios, { AxiosError } from "axios";

export const getHeaders = () => {
  return {
    "Content-type": "application/json",
  };
};


export function handleError(error: AxiosError) {
  if (axios.isCancel(error)) {
    return {
      error: {
        status: "CANCELLED",
        message: "The request has been cancelled",
      },
    };
  }
  /* eslint-disable */ // не успевал
  //@ts-ignore
  return {
    error: {
      /* eslint-disable */ // не успевал
      //@ts-ignore
      status: error.response?.status,
      //@ts-ignore
      data: error.response?.data || error.message,
    },
  };
}

