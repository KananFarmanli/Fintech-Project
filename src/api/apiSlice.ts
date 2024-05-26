import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DataType,
  PaymentPayloadType,
  PaymentResponseType,
  PromoResponseType,
  TransactionPayloadType,
  TransactionResponseType,
} from "./types";


const API_BASE_URL = "https://dolphin-app-8bdiz.ondigitalocean.app";

export const apiSlice = createApi({
  reducerPath: "botApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllBots: builder.query<DataType[], void>({
      query: () => "/bot",
    }),
    getBotById: builder.query<DataType, string>({
      query: (id) => `/bot/${id}`,
      transformResponse: (data: DataType) => {
        if (data.isAvailable == "false") {
          throw new Error();
        }
        return data;
      },
    }),
    checkPromo: builder.mutation<PromoResponseType, { name: string }>({
      query: (promoData) => ({
        url: "/promo/check",
        method: "POST",
        body: promoData,
      }),
    }),
    getToken: builder.mutation<TransactionResponseType, TransactionPayloadType>(
      {
        query: (tokenBody) => ({
          url: "/token",
          method: "POST",
          body: tokenBody,
        }),
      }
    ),
    getPurchase: builder.mutation<PaymentResponseType, PaymentPayloadType>({
      query: (transactionBody) => ({
        url: "/secretkey",
        method: "POST",
        body: transactionBody,
      }),
    }),
  }),
});

export const {
  useGetAllBotsQuery,
  useGetBotByIdQuery,
  useCheckPromoMutation,
  useGetTokenMutation,
  useGetPurchaseMutation,
} = apiSlice;
