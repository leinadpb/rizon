import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/auth.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GeistProvider>
    <CssBaseline />
    <App />
  </GeistProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
