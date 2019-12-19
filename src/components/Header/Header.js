import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
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
