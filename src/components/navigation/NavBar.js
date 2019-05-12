import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';

class NavBar extends Component {
  state = {
    activeItem: 'addEvent',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Segment inverted color='pink'>
        <Menu inverted secondary>
          <Menu.Menu position='left'>
            <Menu.Item
              name='addEvent'
              content='Add Event'
              active={activeItem === 'addEvent'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
          <Menu.Menu position='right'>
            <Menu.Item
              name='register'
              content='Register'
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='login'
              content='Login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>

          <Menu.Menu position='right'>
            <Menu.Item
              name='myEvents'
              content='My Events'
              active={activeItem === 'myEvents'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='initials'
              content='IS'
              active={activeItem === 'initials'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

export default NavBar;

{
  /* active={activeItem === 'reviews'} */
}
