import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Router>
    <App />
    <ToastContainer />
  </Router>
 
)
