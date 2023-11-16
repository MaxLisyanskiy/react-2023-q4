import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { AppStore, RootState } from '../store/store';
import { Provider } from 'react-redux';

import searchReducer from '../store/reducers/SearchSlice';
import viewModeReducer from '../store/reducers/ViewModeSlice';
import pageReducer from '../store/reducers/PageSlice';
import { pokemonAPI } from '../services/fetchData';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        searchReducer,
        viewModeReducer,
        pageReducer,
        [pokemonAPI.reducerPath]: pokemonAPI.reducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonAPI.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
