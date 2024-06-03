import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Canvas } from "../components";
import useResizeObserver from "../hooks/useResizeObserver";
import { motion } from "framer-motion";
import { vector8 } from "../assets/home";
import CopyToClipboard from "../components/copyToClipboard/CopyToClipboard";
import { useTranslation } from "react-i18next";
import { useGetPurchaseMutation } from "../api/apiSlice";
import { useStateProvider } from "../context/StateProvider";
type Inputs = {
  transaction: string;
  token: string;
  email: string;
};

type ErrorData = {
  message: string;
};

export default function ConfirmTransaction() {
  const formRef = useRef(null);
  const {
    operations: { setNotification },
  } = useStateProvider();
  const [purchaseHandler, { isLoading }] = useGetPurchaseMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { t } = useTranslation();
  const onSubmit = async (data: Inputs) => {
    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return;
    }
    const botPayload = data;
    try {
      await purchaseHandler(botPayload).unwrap();
      setNotification({
        error: false,
        message: t("confirmationTransactionDone"),
        success: true,
        visible: true,
      });
    } catch (error: unknown) {
      const typedError = error as { status: number; data: ErrorData };
      if (!typedError.data) return;
      setNotification({
        error: true,
        message:t("confirmationTransactionError"),
        success: false,
        visible: true,
      });
    }
  };
  const { ref: parentRef, size } = useResizeObserver();

  return (
    <motion.div
    ref={parentRef}
    style={{ width: "100%"}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto w-full h-full  text-white  py-44">
        <Canvas height={size.height} width={size.width} />

        <div className="absolute ">
          <img src="" alt="" />
        </div>

        <div className="px-[15px]  sm:px-[20px] lg:px-[35px]  mx-auto max-w-[1366px] w-full h-full flex flex-col items-center justify-center gap-11 ">
          <h1 className="text-3xl text-center">{t("confirmationTransactionTitle")}</h1>

          <div className="flex flex-col gap-4 items-center justify-center ">
            <p className="text-center w-full sm:w-[400px]">
              {t("confirmationTransactionPayment")}
            </p>

            <CopyToClipboard  />
          </div>

          <div
            className="flex flex-col md:flex-row  justify-center items-center gap-11 relative
          "
          >
            <div className="w-full md:w-1/2  flex  flex-col justify-between gap-5 h-full">
              <p>{t("confirmationTransactionSaveTransaction")}</p>

              <p>{t("confirmationTransactionTokenPrecaution")}</p>
              <p>{t("confirmationTransactionSafety")}</p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className=" get-key px-[15px] py-6 sm:px-[20px] lg:px-[35px]  "
            >
              <div className="flex flex-col gap-3 w-full ">
                <label className="flex flex-col gap-2  text-sm font-semibold z-[2] ">
                  <p>
                    {t("confirmationTransactionToken")}:{" "}
                    <span className="required-mark">*</span>
                  </p>
                  <input
                    id="token"
                    {...register("token", { required: true })}
                    className="rounded h-[38px] px-2 py-1 text-black w-full"
                  />
                </label>
                <label className=" flex flex-col gap-2  text-sm font-semibold z-[2]">
                  <p>
                    {t("confirmationTransactionTransaction")}:{" "}
                    <span className="required-mark">*</span>
                  </p>
                  <input
                    id="transaction"
                    {...register("transaction", { required: true })}
                    className=" rounded h-[38px] text-black  px-2 py-1 w-full"
                  />
                </label>
                <label className="relative flex flex-col gap-2  text-sm font-semibold z-[2]">
                  <p>
                    {t("contactFormEmail")}:{" "}
                    <span className="required-mark">*</span>
                  </p>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className=" rounded h-[38px] text-black  px-2 py-1 w-full"
                  />
                  {(errors.token || errors.email || errors.transaction) && (
                    <span className="error-message text-xs absolute top-[80px]">
                      *{t("RequiredFieldsMessage")}
                    </span>
                  )}
                </label>
              </div>

              <button
                className={`rounded hover:bg-blueSection mt-14 text-white transition-all px-2 py-1 max-w-[500px] bg-[#ff0000] min-w-[150px] z-[2] text-sm outline-none self-center flex items-center justify-center ${
                  !isLoading || "hover:bg-slate-500 bg-slate-500"
                }`}
              >
                {t("confirmationTransactionGetKey")}
              </button>

              <div className="absolute w-full right-3 top-[-30px]  max-w-[100px]  z-[1]   ">
                <img className="w-full h-auto scale-y-[-1]" src={vector8} alt="" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
