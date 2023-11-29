import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './reducers/countriesSlice';

const rootReducer = combineReducers({
  countriesReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
