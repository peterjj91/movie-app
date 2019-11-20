import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';

export default class Login extends Component {
  static propTypes = {
    updateUser: PropTypes.func,
    showModal: PropTypes.bool,
    toggleModalLogin: PropTypes.func,
  };

  render() {
    const { showModal, toggleModalLogin } = this.props;

    return (
      <Modal isOpen={showModal} toggle={toggleModalLogin}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}
