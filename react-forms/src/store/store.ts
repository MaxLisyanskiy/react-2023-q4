import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './reducers/countriesSlice';
import uncontrolledFormReducer from './reducers/uncontrolledFormSlice';

const rootReducer = combineReducers({
  countriesReducer,
  uncontrolledFormReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
