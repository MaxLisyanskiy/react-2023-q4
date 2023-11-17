import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: localStorage.getItem('rss_react_basic') ?? '',
};

export const searchSlice = createSlice({
  name: 'SearchSlice',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export default searchSlice.reducer;
