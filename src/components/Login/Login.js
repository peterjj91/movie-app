import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';

import AppContextHOC from './../HOC/AppContextHOC';
import LoginForm from './LoginForm';

class Login extends Component {
  static propTypes = {
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

export default AppContextHOC(Login);
