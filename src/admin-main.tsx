import React from 'react';
import ReactDOM from 'react-dom/client';
import SalonAdmin from './components/SalonAdmin';
import './index.css';

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <SalonAdmin />
  </React.StrictMode>
);
