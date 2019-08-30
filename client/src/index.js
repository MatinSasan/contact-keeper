import React from 'react';
import ReactDOM from 'react-dom';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/Authstate';
import AlertState from './context/alert/AlertState';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <AuthState>
    <ContactState>
      <AlertState>
        <Router>
          <App />
        </Router>
      </AlertState>
    </ContactState>
  </AuthState>,
  document.getElementById('root')
);
