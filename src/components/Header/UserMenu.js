import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import AppContextHOC from './../HOC/AppContextHOC';
import CallApi from './../../api/api';

class UserMenu extends React.Component {
  state = {
    dropdownOpen: false,
  };

  static propTypes = {
    onLogOut: PropTypes.func,
    updateAuth: PropTypes.func,
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  handleLogOut = () => {
    CallApi.delete('/authentication/session', {
      body: {
        session_id: this.props.session_id,
      },
    }).then(() => {
      this.props.onLogOut();
      this.props.updateAuth({ user: null, session_id: null });
    });
  };

  render() {
    const { user } = this.props;

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
            alt=""
            onClick={this.toggleDropdown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogOut}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default AppContextHOC(UserMenu);
