import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonAPI } from '../../services/fetchData';
import { ICard } from '../../types/card-type';

export interface CardsState {
  items: ICard[];
  totalCount: number;
  isLoading: boolean;
}

const initialState: CardsState = {
  items: [],
  totalCount: 0,
  isLoading: false,
};

export const cardsReducer = createSlice({
  name: 'CardsReducer',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ICard[]>) {
      state.items = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonAPI.endpoints?.getAllCards.matchPending,
      (state) => {
        state.isLoading = true;
      },
    );
    builder.addMatcher(
      pokemonAPI.endpoints?.getAllCards.matchFulfilled,
      (state) => {
        state.isLoading = false;
      },
    );
  },
});

export default cardsReducer.reducer;

export const { setItems, setTotalCount } = cardsReducer.actions;
