

export type DataType = {
  id: number;
  isAvailable: string;
  name: string;
  url :string|undefined,
  nameForWeb: string;
  description: { id: string; ru: string; en: string; tr: string };
  type: {
    id: string;
    premium: {
      id: string;
      week: number;
      month: number;
      year: number;
    };
    standard: {
      id: string;
      week: number;
      month: number;
      year: number;
    };
  };
};

export type TransactionPayloadType = {
  botName:string,
  status:string,
  term:string,
  promo:string 
}
export type PaymentPayloadType = {
  transaction:string,
  token:string,
  email:string,
}

export type PromoResponseType = {
  name:string,
  value:number
}

export type TransactionResponseType = {
  token: {
    createdDateTime: string;
    token: string;
  },
  expiredDate: string;
}
export type PaymentResponseType = {
}







 