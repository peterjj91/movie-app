import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './../Login';
import User from './User';

export default class Header extends Component {
  static propTypes = {
    updateUser: PropTypes.func,
    updateSessionId: PropTypes.func,
    user: PropTypes.object,
  };

  render() {
    const { user, updateUser, updateSessionId } = this.props;

    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
          </ul>
          {user ? (
            <User user={user} />
          ) : (
            <Login updateUser={updateUser} updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    );
  }
}
