import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
//Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";  //CSS import
import "bootstrap/dist/js/bootstrap.bundle.min";  //JS import

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router basename='/site'>
        <App/>
    </Router>
  </React.StrictMode>
);