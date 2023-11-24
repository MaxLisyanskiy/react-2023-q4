import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICardsResponse, IDetailedCardResponse } from '../types/card-type';
import {
  API_URL,
  API_CARD_SELECT,
  API_DETAILED_CARD_SELECT,
} from '../shared/constants';
import { HYDRATE } from 'next-redux-wrapper';
import { setItems, setTotalCount } from '@/store/reducers/CardsSlice';
import { setItem } from '@/store/reducers/DetailedSlice';

interface GetAllCardsParams {
  search: string;
  page: number;
  pageSize: number;
}

export const pokemonAPI = createApi({
  reducerPath: 'PokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const mainData = await queryFulfilled;
        const { data, totalCount } = mainData.data;
        dispatch(setItems(data));
        dispatch(setTotalCount(totalCount));
      },
    }),
    getDetailedCard: builder.query<IDetailedCardResponse, string | string[]>({
      query: (id) => ({
        url: `/${id}`,
        params: {
          select: API_DETAILED_CARD_SELECT,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const mainData = await queryFulfilled;
        const { data } = mainData.data;
        dispatch(setItem(data));
      },
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useGetDetailedCardQuery,
  util: { getRunningQueriesThunk },
} = pokemonAPI;

export const { getAllCards, getDetailedCard } = pokemonAPI.endpoints;
