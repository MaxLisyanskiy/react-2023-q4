import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { PROJECT_PATH } from './constants';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import App from '../components/App/App';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import DetailedCard from '../components/DetailedCard/DetailedCard';

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

export const router = createBrowserRouter(routes);
