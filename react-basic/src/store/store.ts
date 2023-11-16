import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { pokemonAPI } from '../services/fetchData';
import searchReducer from './reducers/SearchSlice';
import viewModeReducer from './reducers/ViewModeSlice';
import pageReducer from './reducers/PageSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  searchReducer,
  viewModeReducer,
  pageReducer,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};

const store = setupStore();
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
