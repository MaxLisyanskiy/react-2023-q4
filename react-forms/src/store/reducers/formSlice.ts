import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInputs } from '../../types';

interface FormSliceState {
  forms: FormInputs[];
}

const initialState: FormSliceState = {
  forms: [],
};

export const formSlice = createSlice({
  name: 'FormSlice',
  initialState,
  reducers: {
    setNewForm(state, action: PayloadAction<FormInputs>) {
      state.forms.unshift(action.payload);
    },
  },
});

export const { setNewForm } = formSlice.actions;
export default formSlice.reducer;
