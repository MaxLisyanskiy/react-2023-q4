import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewModeState {
  mode: boolean;
}

const initialState: ViewModeState = {
  mode: false,
};

export const viewModeSlice = createSlice({
  name: 'ViewModeSlice',
  initialState,
  reducers: {
    changeViewMode(state, action: PayloadAction<boolean>) {
      state.mode = action.payload;
    },
  },
});

export default viewModeSlice.reducer;
