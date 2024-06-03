import { ReactNode } from "react";
import { useRouteError } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import errorPng from '../assets/error/error1.png'

export class PatchedError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export type PatchedErrorType = {
  message: string;
  status: number;
};

export default function ErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError() as PatchedErrorType;
  let errorMessage: string | ReactNode = "";
  errorMessage = <div>{t("errorMessage")}</div>;

  if (error.status === 404) {
    errorMessage = <div>{error.message}</div>;
  }

  if (error.status === 401) {
    errorMessage = <div>{t("errorMessage401")}</div>;
  }

  if (error.status === 503) {
    errorMessage = <div>{t("errorMessage503")}</div>;
  }
 


  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-10 h-screen my-container ">
      <div className=" w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px]">
        <img className="w-full h-auto" src={errorPng} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4  text-[30px] font-serif text-white">
      <h1 className="text-violetSection text-[30px] sm:text-[40px] md:text-[60px] lg:text-[100px] ">{t("errorBoundary2")}</h1>
      <p className=" text-[20px] sm:text-[30px] md:text-[45px] lg:text-[55px]">{errorMessage}</p>
      <p className="text-blueSection text-[20px] sm:text-[30px] md:text-[45px] lg:text-[55px]">{t("errorBoundary1")}: {error.status}</p>
      </div>
    </motion.div>
  );
}
