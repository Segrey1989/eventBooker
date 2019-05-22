import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Events/Dashboard';
import NavBar from './components/navigation/NavBar';
import AddEvent from './components/Events/AddEvent';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const { auth } = this.props;
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/addEvent' component={AddEvent} />
          </Switch>
        </BrowserRouter>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(App);
