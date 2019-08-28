import React from 'react';
import ReactDOM from 'react-dom';
import ContactState from './context/contact/ContactState';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <ContactState>
    <Router>
      <App />
    </Router>
  </ContactState>,
  document.getElementById('root')
);
