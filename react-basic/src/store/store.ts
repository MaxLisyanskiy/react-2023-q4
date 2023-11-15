import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonAPI } from '../services/fetchData';
import searchReducer from './reducers/SearchSlice';
import viewModeSlice from './reducers/ViewModeSlice';

const rootReducer = combineReducers({
  searchReducer,
  viewModeSlice,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
