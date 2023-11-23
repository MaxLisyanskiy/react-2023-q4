import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonAPI } from '../../services/fetchData';
import { ICard } from '../../types/card-type';
import { PAGE, PAGE_SIZE } from '../../utils/constants';

interface CardsState {
  currentPage: number;
  currentPageSize: number;
  isLoading: boolean;
  items: ICard[];
}

const initialState: CardsState = {
  currentPage: PAGE,
  currentPageSize: PAGE_SIZE,
  isLoading: false,
  items: [],
};

export const cardsReducer = createSlice({
  name: 'CardsReducer',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCurrentPageSize(state, action: PayloadAction<number>) {
      state.currentPageSize = action.payload;
    },
    setItems(state, action: PayloadAction<ICard[]>) {
      state.items = action.payload;
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

export const { setCurrentPage, setCurrentPageSize, setItems } =
  cardsReducer.actions;
