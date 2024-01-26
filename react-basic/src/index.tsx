import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { PROJECT_PATH } from './constants';
import App from './components/App';
import About from './components/About/About';
import ErrorBoundary from './components/Error/ErrorBoundary';
import './styles/index.scss';

export const routes: RouteObject[] = [
  {
    path: PROJECT_PATH,
    element: <App />,
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
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
