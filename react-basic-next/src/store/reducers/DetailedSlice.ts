import { IDetailedCard } from '@/types/card-type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonAPI } from '../../services/fetchData';

interface DetailedState {
  item: IDetailedCard | null;
  isLoading: boolean;
}

const initialState: DetailedState = {
  item: null,
  isLoading: false,
};

export const detailedSlice = createSlice({
  name: 'ViewModeSlice',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<IDetailedCard>) {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonAPI.endpoints?.getDetailedCard.matchPending,
      (state) => {
        state.isLoading = true;
      },
    );
    builder.addMatcher(
      pokemonAPI.endpoints?.getDetailedCard.matchFulfilled,
      (state) => {
        state.isLoading = false;
      },
    );
  },
});

export default detailedSlice.reducer;

export const { setItem } = detailedSlice.actions;
