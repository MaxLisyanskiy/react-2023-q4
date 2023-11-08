import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { PROJECT_PATH } from './utils/constants';

import ErrorBoundary from './components/Error/ErrorBoundary';
import App from './components/App/App';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import DetailedCard from './components/DetailedCard/DetailedCard';

import './styles/index.scss';

export const routes: RouteObject[] = [
  {
    path: PROJECT_PATH,
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':id',
        element: <DetailedCard />,
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
