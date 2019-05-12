import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Events/Dashboard';
import NavBar from './components/navigation/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
