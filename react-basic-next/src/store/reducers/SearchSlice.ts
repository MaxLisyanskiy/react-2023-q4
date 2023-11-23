import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: '',
};

export const searchSlice = createSlice({
  name: 'SearchSlice',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export default searchSlice.reducer;
