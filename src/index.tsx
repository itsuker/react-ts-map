import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MapsApp } from './MapsApp';
import * as maptilersdk from '@maptiler/sdk';
maptilersdk.config.apiKey = 'Yyli32naHifn9Qr83LPq';
if(!navigator.geolocation){
  alert('tu navegador no soporta esta geo localizacion');
  throw new Error('Geolocation not available');
}




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
<MapsApp />
  </React.StrictMode>
);

