import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GeoProvider } from 'components/context/geoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GeoProvider>
      <App />
    </GeoProvider>
  </React.StrictMode>
);