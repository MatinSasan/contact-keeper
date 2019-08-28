import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';

const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const PageNotFound = lazy(() => import('./components/pages/PageNotFound'));

const App = () => {
  return (
    <Fragment className='App'>
      <Navbar />
      <div className='container'>
        <Suspense fallback={<h1>Please wait...</h1>}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
