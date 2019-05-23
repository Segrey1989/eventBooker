import React, { Component } from 'react';
import { Grid, Segment, Form, Button, Message } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Settings extends Component {
  state = {};

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitForm = e => {
    const functions = this.props.firebase.functions();
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole(this.state).then(result => {
      const { message, errorInfo } = result.data;
      if (message) {
        this.setState({ createAdminSuccess: message, createAdminError: null });
      } else {
        this.setState({
          createAdminError: errorInfo.message,
          createAdminSuccess: null,
        });
      }
    });
  };

  render() {
    const { createAdminSuccess, createAdminError } = this.state;
    if (!this.props.isAdmin) return <Redirect to='/' />;
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Form onSubmit={this.handleSubmitForm}>
                <Form.Field>
                  <label>
                    Providing email you give this person admin rights
                  </label>
                  <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    onChange={this.handleInputChange}
                  />
                </Form.Field>
                {createAdminSuccess && (
                  <Message positive>{createAdminSuccess}</Message>
                )}
                {createAdminError && (
                  <Message negative>{createAdminError}</Message>
                )}
                <Button type='submit'>Add admin</Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>2</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.authReducer.isAdmin,
  };
};

export default compose(
  connect(mapStateToProps),
  withFirebase,
)(Settings);
