import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICardsResponse, IDetailedCardResponse } from '../types/card-type';
import {
  API_URL,
  API_CARD_SELECT,
  API_DETAILED_CARD_SELECT,
} from '../utils/constants';

interface GetAllCardsParams {
  search: string;
  page: number;
  pageSize: number;
}

export const pokemonAPI = createApi({
  reducerPath: 'PokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllCards: builder.query<ICardsResponse, GetAllCardsParams>({
      query: ({ search, page, pageSize }) => ({
        url: search ? `?q=name:${search}` : '',
        params: {
          page,
          pageSize,
          select: API_CARD_SELECT,
        },
      }),
    }),
    getDetailedCard: builder.query<IDetailedCardResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        params: {
          select: API_DETAILED_CARD_SELECT,
        },
      }),
    }),
  }),
});
