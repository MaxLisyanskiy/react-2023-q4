import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { NotFoundPage } from '../pages/not-found-page';
import { UncontrolledFormPage } from '../pages/uncontrolled-form-page';
import { ReactHookFormPage } from '../pages/react-hook-form-page';
import { Layout } from '../components/layout';

export const PathConstants = {
  HOME: '/react-2023-q4/react-forms',
  UNCONTROLLED: '/react-2023-q4/react-forms/uncontrolled-form',
  RHF: '/react-2023-q4/react-forms/react-hook-form',
};

export const routes: RouteObject[] = [
  {
    path: PathConstants.HOME,
    element: <Layout />,
    children: [
      {
        path: PathConstants.HOME,
        element: <MainPage />,
      },
      {
        path: PathConstants.UNCONTROLLED,
        element: <UncontrolledFormPage />,
      },
      {
        path: PathConstants.RHF,
        element: <ReactHookFormPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
