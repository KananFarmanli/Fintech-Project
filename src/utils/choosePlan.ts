import { DataType, TransactionPayloadType } from "../api/types";

export function transformToArray(data: DataType, statusDefault = "standard") {
  const term = Object.entries(
    data.type[statusDefault as keyof typeof data.type]
  ).filter(([key]) => key !== "id");
  const subscription = Object.entries(data.type).filter(
    ([key]) => key !== "id"
  );
  return { term, subscription };
}

export function getPromo() {
  return localStorage.getItem("promo");
}
export function setPromo(promo: string) {
  localStorage.setItem("promo", promo);
}

export function valuesUppercase(
  obj: TransactionPayloadType
): TransactionPayloadType {
  const newObj: TransactionPayloadType = {
    botName: obj?.botName.toUpperCase(),
    status: obj?.status.toUpperCase(),
    term: obj?.term.toUpperCase(),
    promo: obj.promo,
  };
  return newObj;
}

export function determineTypePromo(
  promo: number,
  t: (key: string, options?: unknown) => string
): {
  message: string;
  discount: number;
} {
  if (promo < 10) {
    return {
      message: t('congratulationsFreeBots', { count: promo }),
      discount: 0,
    };
  } else {
    return {
      message: t('congratulationsDiscount', { discount: promo }),
      discount: promo,
    };
  }
}

export function calculatePriceWithDiscount(price: number, discount: number) {
  return price - (price * discount) / 100;
}
