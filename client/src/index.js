import './index.css'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { persistor, store } from './redux-toolkit/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App'

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
