import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import DisplayMyEventsModal from '../Modal/DisplayMyEventsModal';

class NavBar extends Component {
  state = {
    activeItem: 'addEvent',
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === 'signout') {
      this.props.signOut(this.props.firebase);
    }
  };

  render() {
    const { activeItem } = this.state;
    const { auth } = this.props;
    return (
      <Segment inverted color='pink'>
        <Menu inverted secondary>
          <Menu.Menu position='left'>
            <Menu.Item
              as={Link}
              to='/addEvent'
              name='addEvent'
              content='Add Event'
              active={activeItem === 'addEvent'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
          {auth.isEmpty && (
            <Menu.Menu position='right'>
              <Menu.Item
                as={Link}
                to='/register'
                name='register'
                content='Register'
                active={activeItem === 'register'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to='/login'
                name='login'
                content='Login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          )}

          {!auth.isEmpty && (
            <Menu.Menu position='right'>
              <Menu.Item
                as={Link}
                to='/'
                name='home'
                content='Home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              />
              <DisplayMyEventsModal />
              {/* <Menu.Item
                as={Link}
                to='/myevents'
                name='myEvents'
                content='My Events'
                active={activeItem === 'myEvents'}
                onClick={this.handleItemClick}
              /> */}
              <Menu.Item
                as={Link}
                to='/user'
                name='user'
                content='Siarhei'
                active={activeItem === 'user'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='signout'
                content='Sign Out'
                active={activeItem === 'signout'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          )}
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

const dispatchStateToProps = dispatch => {
  return {
    signOut: firebase => dispatch(signOut(firebase)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    dispatchStateToProps,
  ),
  withFirebase,
)(NavBar);
