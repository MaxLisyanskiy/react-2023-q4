import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper } from 'next-redux-wrapper';
import { pokemonAPI } from '@/services/fetchData';

import searchReducer from './reducers/SearchSlice';
import cardsReducer from './reducers/CardsSlice';
import detailedReducer from './reducers/DetailedSlice';

const rootReducer = combineReducers({
  searchReducer,
  cardsReducer,
  detailedReducer,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};

const store = setupStore();
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
