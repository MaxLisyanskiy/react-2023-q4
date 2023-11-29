import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';

import 'normalize.css';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
