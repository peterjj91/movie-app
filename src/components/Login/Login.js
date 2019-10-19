import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };
  }

  static propTypes = {
    updateUser: PropTypes.func,
  };

  toggleModal = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>

        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm updateUser={this.props.updateUser} />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
