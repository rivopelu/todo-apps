import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import storeRedux from "./Redux/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={storeRedux}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
