import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppContextHOC from './../HOC/AppContextHOC';
import UserMenu from './UserMenu';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object,
    toggleModalLogin: PropTypes.func.isRequired,
  };

  render() {
    const {
      toggleModalLogin,
      auth: { user },
    } = this.props;

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
            <UserMenu />
          ) : (
            <React.Fragment>
              <button
                className="btn btn-success"
                type="button"
                onClick={toggleModalLogin}
              >
                Login
              </button>
            </React.Fragment>
          )}
        </div>
      </nav>
    );
  }
}

export default AppContextHOC(Header);
