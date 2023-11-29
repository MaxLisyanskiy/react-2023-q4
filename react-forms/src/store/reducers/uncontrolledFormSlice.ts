import { createSlice } from '@reduxjs/toolkit';

interface ViewModeState {
  name: string;
  age: number | null;
  email: string;
  gender: string;
  password: string;
  passwordRepeat: string;
  t_c: boolean;
  picture: string;
  country: string;
}

const initialState: ViewModeState = {
  name: '',
  age: null,
  email: '',
  gender: '',
  password: '',
  passwordRepeat: '',
  t_c: false,
  picture: '',
  country: '',
};

export const uncontrolledFormSlice = createSlice({
  name: 'ViewModeSlice',
  initialState,
  reducers: {
    // changeViewMode(state, action: PayloadAction<boolean>) {
    //   state.viewItem = action.payload;
    // },
  },
});

export default uncontrolledFormSlice.reducer;
