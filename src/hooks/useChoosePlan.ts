import { useState } from "react";
import { useGetBotByIdQuery, useGetTokenMutation } from "../api/apiSlice";
import { useParams, useNavigate } from "react-router-dom";
import useResizeObserver from "../hooks/useResizeObserver";
import usePromo from "../hooks/usePromo";
import { useStateProvider } from "../context/StateProvider";
import {
  transformToArray,
  getPromo,
  valuesUppercase,
  setToken,
  calculatePriceWithDiscount,
} from "../utils/choosePlan";
import { TransactionPayloadType } from "../api/types";
import { PatchedError, PatchedErrorType } from "../pages/ErrorBoundary";
import { useTranslation } from "react-i18next";




export default function useChoosePlan() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    operations: { setNotification },
  } = useStateProvider();
  const { id: botID } = useParams<{ id: string }>();
  const {
    data: botData,
    isSuccess: isBotSuccess,
    isLoading: isBotLoading,
    isError: isBotError,
    error: botError,
  } = useGetBotByIdQuery(botID!);

  if (isBotError) {
    if ("stack" in botError) {
      const status = 404;
      throw new PatchedError(t("botNotAvailable"), status);
    }
    const status = (botError as PatchedErrorType).status;
    throw new PatchedError(t("errorBot"), status);
  }


  const [selectedPlan, setSelectedPlan] = useState<TransactionPayloadType>({
    botName: "",
    term: "week",
    status: "standard",
    promo: getPromo()?.promo || "" ,
  });

  const {
    operations: {
      discount,
      promoRef,
      data: promoData,
      error: promoError,
      isError: isPromoError,
      isLoading: isPromoLoading,
    },
    models: { handlePromoButton },
  } = usePromo({ selectedPlan, setSelectedPlan });

  const [tokenHandler] = useGetTokenMutation();

  const { ref: parentRef, size } = useResizeObserver();



  const handleSubscriptionCheckbox = (key: string) => {
    setSelectedPlan((prev) => ({
      ...prev,
      status: key,
    }));
  };

  const handleTermCheckbox = (key: string) => {
    setSelectedPlan((prev) => ({
      ...prev,
      term: key,
    }));
  };

  const proceedHandler = async () => {
    if (!botData?.name) return;
    const dto = { ...selectedPlan, botName: botData?.name };
    const tokenPayload = valuesUppercase(dto);
    try {
      const data = await tokenHandler(tokenPayload).unwrap();
      setToken(data.token.token);
      setNotification({
        error: false,
        message: t("choosePlanNotificationReady"),
        success: true,
        visible: true,
        manuallyClose:false
      });
      setTimeout(() => navigate("/buy"), 2000);
    } catch (error: unknown) {
      const typedError = error as { status: number; data?: unknown };
      setNotification({
        error: true,
        message: `${t("choosePlanNotificationError")}: ${typedError.status}`,
        success: false,
        visible: true,
        manuallyClose:false
      });
    }
  };

  let priceToPay = 0;

  if (isBotSuccess) {
    const selectedTerm = transformToArray(botData!, selectedPlan.status).term.find(([key]) => key === selectedPlan.term);
    const price = selectedTerm ? selectedTerm[1] : 0;
    priceToPay = calculatePriceWithDiscount(+price, discount);
  }

  return {
    operations: {
      discount,
      botData,
      promoRef,
      isBotSuccess,
      isBotLoading,
      parentRef,
      size,
      promoData,
      promoError,
      isPromoError,
      isPromoLoading,
      selectedPlan,
      priceToPay,
    },
    models: {
      proceedHandler,
      handleTermCheckbox,
      handleSubscriptionCheckbox,
      handlePromoButton,
      transformToArray,
    },
  };
}
