import React from 'react';
import ReactDOM from 'react-dom';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/Authstate';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <AuthState>
    <ContactState>
      <Router>
        <App />
      </Router>
    </ContactState>
  </AuthState>,
  document.getElementById('root')
);
