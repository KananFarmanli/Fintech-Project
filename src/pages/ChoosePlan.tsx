import { Canvas, CheckIcon } from "../components";
import useChoosePlan from "../hooks/useChoosePlan";
import { motion } from "framer-motion";
import { calculatePriceWithDiscount } from "../utils/choosePlan";
import { useTranslation } from "react-i18next";
import { useStateProvider } from "../context/StateProvider";
import Resources from "../@types/resources";

export default function ChoosePlan() {
  const {
    models: { lang },
  } = useStateProvider();

  const { t } = useTranslation();
  const {
    operations: {
      discount,
      botData,
      priceToPay,
      promoRef,
      isBotSuccess,
      isBotLoading,
      parentRef,
      size,
      promoError,
      isPromoLoading,
      selectedPlan,
    },
    models: {
      proceedHandler,
      handleTermCheckbox,
      handleSubscriptionCheckbox,
      handlePromoButton,
      transformToArray,
    },
  } = useChoosePlan();


  return (
    <motion.div
      ref={parentRef}
      style={{ width: "100%", marginBlock: "100px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className=" w-full h-full  px-[15px] gap-5 md:gap-[40px] flex flex-col justify-center items-center overflow-hidden">
        
        <Canvas height={size.height} width={size.width} />
        {isBotSuccess && (
          <>
            <div className="mx-auto max-w-[500px] sm:max-w-[unset] flex flex-col justify-center items-center gap-[20px] w-full">
              <h1 className="text-[22px] md:text-2xl xl:text-3xl font-semibold leading-10 text-white">
                {botData!.nameForWeb.replace(/_/g, " ")}
              </h1>
              <p className="text-base md:text-lg xl:text-xl font-normal leading-10 text-white text-center">
                {botData!.description[lang]}
              </p>
            <div className="text-white text-center">
                <h1 className="text-lg "> {t("choosePlanInfo")}</h1>
                <p>
                {t("choosePlanInfoText1")}
                </p>
                <p> {t("choosePlanInfoText2")}</p>
              </div>
            </div>
            <label className="relative mx-auto max-w-[500px] sm:max-w-[300px] flex flex-col justify-center  w-full gap-4 ">
              <h1 className="text-white text-base md:text-lg xl:text-xl w-full text-center ">
                {t("choosePlanPromo")}
              </h1>
              <div
                className={` flex h-[38px] rounded overflow-hidden
           ${!!selectedPlan.promo && " text-slate-400"} `}
              >
                <input
                  ref={promoRef}
                  type="text"
                  disabled={!!selectedPlan.promo}
                  className="h-full w-full outline-none  px-2 py-1"
                  placeholder={`${
                    selectedPlan.promo || t("choosePlanPromoInput")
                  }`}
                />
                <button
                  disabled={isPromoLoading}
                  onClick={handlePromoButton}
                  className={` hover:bg-blueSection text-white text-sm transition-all px-2 py-1 h-full w-[100px] bg-[#ff0000] flex items-center justify-center outline-none ${
                    !isPromoLoading || "hover:bg-slate-500 bg-slate-500"
                  }`}
                >
                  {!isPromoLoading ? (
                    selectedPlan.promo ? (
                      t("choosePlanPromoDelete")
                    ) : (
                      t("choosePlanPromoCheck")
                    )
                  ) : (
                    <div className="lds-dual-ring"></div>
                  )}
                </button>
              </div>
              {promoError && (
                <p className="text-red-500 text-sm -bottom-6 absolute w-full ml-1 ">
                  {t("choosePlanPromoNotValid")}
                </p>
              )}
            </label>
            <div className="mx-auto max-w-[500px] sm:max-w-[unset] flex justify-center items-center gap-[20px] w-full">
              {transformToArray(botData!).subscription.map(([key], index) => {
                const isChecked = selectedPlan.status == key || false;
                return (
                  <label
                    htmlFor={key}
                    key={key}
                    className={`subscription subscription-${index + 1}   ${
                      !isChecked ||
                      `ring-2 subscription-ring-${
                        index + 1
                      } ring-offset-2 ring-offset-[#acd6ff]`
                    } `}
                  >
                    <p className="text-sm md:text-base xl:text-lg font-semibold leading-10 ">
                      {t(key as keyof Resources["translation"]).toUpperCase()}
                    </p>

                    <input
                      id={key}
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleSubscriptionCheckbox(key)}
                    />
                    {isChecked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="h-4 w-4" />
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
            <div className="w-full gap-4 md:gap-11 flex flex-col sm:flex-row justify-center items-center ">
              {transformToArray(botData!, selectedPlan.status).term.map(
                ([key, value], index) => {
                  const isChecked = selectedPlan.term == key || false;
                  return (
                    <label
                      htmlFor={key}
                      key={key}
                      className={`term term-${index + 1}   ${
                        !isChecked ||
                        `ring-2 term-ring-${
                          index + 1
                        } ring-offset-2 ring-offset-[#acd6ff]`
                      } `}
                    >
                      <div className="h-12 gap-[12px] justify-start items-center inline-flex pb-2 select-none">
                        <span className="text-[16px] xl:text-[24px] leading-10">
                          $
                        </span>
                        <span className="text-[24px] md:text-[32px] xl:text-[44px] font-semibold leading-10">
                          {calculatePriceWithDiscount(
                            value as number,
                            discount
                          )}
                        </span>
                        <span className="text-[18px] md:text-[20px] xl:text-[24px] font-normal leading-10">
                          /{t(key as keyof Resources["translation"])}
                        </span>
                      </div>
                      <input
                        id={key}
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={() => handleTermCheckbox(key)}
                      />
                      {isChecked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-5 w-5  sm:h-4 sm:w-4   xl:h-6 xl:w-6" />
                        </div>
                      )}
                    </label>
                  );
                }
              )}
            </div>
            <div className="text-white">
         { t("choosePlanPrice")} {priceToPay}$. 
            </div>
            <div className="w-full flex items-center justify-center  ">
              <button
                disabled={isPromoLoading && isBotLoading}
                onClick={proceedHandler}
                className={`rounded hover:bg-blueSection text-sm text-white transition-all px-2 py-2 h-full max-w-[500px] w-[150px] bg-[#ff0000]  outline-none flex items-center justify-center ${
                  !(isPromoLoading && isBotLoading) ||
                  "hover:bg-slate-500 bg-slate-500"
                }`}
              >
                {t("choosePlanPromoProceed")}
              </button>
            </div>
          </>
        )}
        <div className="flex flex-col gap-5 text-white w-1/2 max-w-[1366px] text-center">


        </div>
      </div>
    </motion.div>
  );
}