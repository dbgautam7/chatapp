import './index.css'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from "react-redux";
import { persistor, store } from './redux-toolkit/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App'

render(
    <BrowserRouter>
     <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
<App/>
</PersistGate>
</Provider>
</BrowserRouter>, 
document.querySelector('#app'))
