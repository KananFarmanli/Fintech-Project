import { SetStateAction, Dispatch, useEffect, useRef, useState } from "react";
import { TransactionPayloadType } from "../api/types";
import { useStateProvider } from "../context/StateProvider";
import { determineTypePromo, getPromo, setPromo } from "../utils/choosePlan";
import { useCheckPromoMutation } from "../api/apiSlice";
import { useTranslation } from "react-i18next";
type usePromoType = {
  selectedPlan: TransactionPayloadType;
  setSelectedPlan: Dispatch<SetStateAction<TransactionPayloadType>>;
};

export default function usePromo({
  selectedPlan,
  setSelectedPlan,
}: usePromoType) {
  const promoRef = useRef<HTMLInputElement | null>(null);

  const { operations: { setNotification }} = useStateProvider();
  const [discount, setDiscount] = useState(getPromo()?.value || 0);
  const [trigger, { data, isLoading, isSuccess, error, isError }] =
    useCheckPromoMutation();
  const { t } = useTranslation();
  const handlePromoButton = async () => {
    if (promoRef.current && selectedPlan.promo) {
      localStorage.removeItem("promo");
      setSelectedPlan((prev) => ({
        ...prev,
        promo: "",
      }));
      promoRef.current.value = "";
      setDiscount(0);
      return;
    }
    if (!promoRef.current?.value) return;
    await trigger({ name: promoRef.current?.value });
  };
  useEffect(() => {
    const checkPromoExpiry = () => {
      const promoData = getPromo();
      if (!promoData) {
        setDiscount(0);
        setSelectedPlan(prev => ({ ...prev, promo: "" }));
        if (promoRef.current) {
          promoRef.current.value = "";
        }
        if (intervalId !== undefined) clearInterval(intervalId);
      }
    };
//
    let intervalId:any

    if (getPromo()) {
      intervalId = setInterval(checkPromoExpiry, 60000);
    }
  
    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [selectedPlan.promo]);
  
  useEffect(() => {
    if (isSuccess) {
      if (!data!.value) return;
      const promo = determineTypePromo(data!.value, t);
      setDiscount(promo.discount);
      setNotification((prev) => ({
        ...prev,
        error: false,
        message: promo.message,
        success: false,
        visible: true,
      }));
      setSelectedPlan((prev) => ({
        ...prev,
        promo: promoRef.current!.value,
      }));
      setPromo(promoRef.current!.value, promo.discount)
    }
  }, [isSuccess]);

  return {
    operations: {
      promoRef,
      data,
      isError,
      isLoading,
      isSuccess,
      error,
      discount,
    },
    models: { handlePromoButton },
  };
}
