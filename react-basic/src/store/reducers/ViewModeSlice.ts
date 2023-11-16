import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonAPI } from '../../services/fetchData';

interface ViewModeState {
  viewItem: boolean;
  isLoading: boolean;
}

const initialState: ViewModeState = {
  viewItem: false,
  isLoading: false,
};

export const viewModeSlice = createSlice({
  name: 'ViewModeSlice',
  initialState,
  reducers: {
    changeViewMode(state, action: PayloadAction<boolean>) {
      state.viewItem = action.payload;
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

export default viewModeSlice.reducer;
