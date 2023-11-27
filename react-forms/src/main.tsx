import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'normalize.css';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
