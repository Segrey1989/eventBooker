import React, { Component } from 'react';
import { Header, Modal, Button } from 'semantic-ui-react';
import { cancelEvent } from '../../store/actions/eventActions';
import { connect } from 'react-redux';

class CancellEventModal extends Component {
  handelButtonClick = e => {
    const dataForCancelation = {
      event: this.props.data.event,
      user: { ...this.props.data.user, id: this.props.data.auth.uid },
      firebase: this.props.data.firebase,
    };
    this.props.cancelEvent(dataForCancelation);
  };

  render() {
    const { trigger } = this.props;

    return (
      <Modal trigger={trigger} size='tiny' closeOnDimmerClick={true}>
        <Header textAlign='center'>Cancell Event</Header>
        <Modal.Content>
          <Header textAlign='center'>
            Are you sure you want to cancell event?
          </Header>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handelButtonClick}>
            Cancell
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const dispatchStateToProps = dispatch => {
  return {
    cancelEvent: data => dispatch(cancelEvent(data)),
  };
};

export default connect(
  null,
  dispatchStateToProps,
)(CancellEventModal);
