import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './utils/router';
import './styles/index.scss';
import { setupStore } from './store/store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
