import { SetStateAction, Dispatch, useEffect, useRef, useState } from "react";
import { TransactionPayloadType } from "../api/types";
import { useStateProvider } from "../context/StateProvider";
import { determineTypePromo } from "../utils/choosePlan";
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

  const {
    operations: { setNotification },
  } = useStateProvider();
  const [discount, setDiscount] = useState(0);
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
  // how to correct it
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
      localStorage.setItem("promo", promoRef.current!.value);
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
