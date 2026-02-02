import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ItemsContextProvider } from './store/ItemsContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ItemsContextProvider>
        <Routes>
          <Route path="/" exact element={<App />} />
        </Routes>
      </ItemsContextProvider>
    </Router>
  </React.StrictMode>
);

