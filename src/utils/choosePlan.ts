import { TFunction } from "i18next";
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
type getPromoType = {
  promo: string,
  value: number,
  expiryTime:number
}
export function getPromo(): getPromoType | null {
  const promoData = localStorage.getItem('promo');
  if (!promoData) {
    return null;
  }

  const { promo, value, expiryTime } = JSON.parse(promoData);
  const currentTime = new Date().getTime();

  if (currentTime > expiryTime) {
    localStorage.removeItem('promo');
    return null;
  }

  return { promo, value, expiryTime };
};

export function setPromo(promo: string, value:number) {
  const expiryTime = new Date().getTime() + 15 * 60 * 1000; 
  const promoData = JSON.stringify({ promo,value, expiryTime });
  localStorage.setItem('promo', promoData);
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


export function setToken (token: string) {
  const expiryTime = new Date().getTime() + 15 * 60 * 1000; 
  const tokenData = JSON.stringify({ token, expiryTime });
  localStorage.setItem('authToken', tokenData);
};

export function getToken (): string | null {
  const tokenData = localStorage.getItem('authToken');
  if (!tokenData) {
    return null;
  }

  const { token, expiryTime } = JSON.parse(tokenData);
  const currentTime = new Date().getTime();

  if (currentTime > expiryTime) {
    localStorage.removeItem('authToken');
    return null;
  }

  return token;
};

export function determineTypePromo(
  promo: number,
  t: TFunction
): {
  message: string;
  discount: number;
} {
  if (promo < 10) {
    return {
      message: t("congratulationsFreeBots", { count: promo }),
      discount: 0,
    };
  } else {
    return {
      message: t("congratulationsDiscount", { discount: promo }),
      discount: promo,
    };
  }
}

export function calculatePriceWithDiscount(price: number, discount: number) {
  return price - (price * discount) / 100;
}
