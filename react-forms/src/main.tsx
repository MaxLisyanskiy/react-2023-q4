import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';

import 'normalize.css';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
