import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
//Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";  //CSS import
import "bootstrap/dist/js/bootstrap.bundle.min";  //JS import

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path='/*' element={<App/>}/>
        </Routes>
    </Router>
);