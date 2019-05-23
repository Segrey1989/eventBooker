import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Events/Dashboard';
import NavBar from './components/navigation/NavBar';
import AddEvent from './components/Events/AddEvent';
import Settings from './components/Settings/Settings';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { getCustomClaims } from './store/actions/authActions';

class App extends React.Component {
  render() {
    const { auth } = this.props;
    this.props.getCustomClaims(this.props.firebase);
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/addEvent' component={AddEvent} />
            <Route path='/settings' component={Settings} />
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

const dispatchStateToProps = dispatch => {
  return {
    getCustomClaims: firebase => dispatch(getCustomClaims(firebase)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    dispatchStateToProps,
  ),
  withFirebase,
)(App);
