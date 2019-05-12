import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';

class Register extends Component {
  render() {
    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        className='registrationForm'
      >
        <Grid.Column color='pink' width={10}>
          <Form>
            <Header as='h2'>Register</Header>
            <Segment>
              <Form.Input
                type='text'
                name='username'
                placeholder='username'
                icon='user'
                iconPosition='left'
              />
              <Form.Input
                type='email'
                name='email'
                placeholder='email'
                icon='mail'
                iconPosition='left'
              />
              <Form.Input
                type='password'
                name='password'
                placeholder='password'
                icon='lock'
                iconPosition='left'
              />
              <Form.Input
                type='password'
                name='passwordConfirmation'
                placeholder='confirm password'
                icon='repeat'
                iconPosition='left'
              />
              <Button animated>
                <Button.Content visible> Register</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
