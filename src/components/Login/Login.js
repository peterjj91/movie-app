import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';

import AppContextHOC from './../HOC/AppContextHOC';
import LoginForm from './LoginForm';

class Login extends Component {
  static propTypes = {
    showLoginModal: PropTypes.bool,
    toggleModalLogin: PropTypes.func,
  };

  render() {
    const { showLoginModal, toggleModalLogin } = this.props;

    return (
      <Modal isOpen={showLoginModal} toggle={toggleModalLogin}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}

export default AppContextHOC(Login);
