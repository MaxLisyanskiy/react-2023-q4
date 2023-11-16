import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonAPI } from '../../services/fetchData';
import { ICard } from '../../types/card-type';
import { PAGE, PAGE_SIZE } from '../../utils/constants';

interface PageState {
  currentPage: number;
  currentPageSize: number;
  isLoading: boolean;
  items: ICard[];
}

const initialState: PageState = {
  currentPage: PAGE,
  currentPageSize: PAGE_SIZE,
  isLoading: false,
  items: [],
};

export const pageSlice = createSlice({
  name: 'PageSlice',
  initialState,
  reducers: {
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    changeCurrentPageSize(state, action: PayloadAction<number>) {
      state.currentPageSize = action.payload;
    },
    changeItems(state, action: PayloadAction<ICard[]>) {
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

export default pageSlice.reducer;
