import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const PageNotFound = lazy(() => import('./components/pages/PageNotFound'));
const Register = lazy(() => import('./components/auth/Register'));
const Login = lazy(() => import('./components/auth/Login'));

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Alerts />
        <Suspense fallback={<h1>Please wait...</h1>}>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
