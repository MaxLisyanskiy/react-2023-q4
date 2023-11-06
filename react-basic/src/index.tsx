import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { PROJECT_PATH } from './utils/constants';

import ErrorBoundary from './components/Error/ErrorBoundary';
import App from './components/App';
import About from './components/About/About';
import './styles/index.scss';

export const routes: RouteObject[] = [
  {
    path: PROJECT_PATH,
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ':id',
        element: <About />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
