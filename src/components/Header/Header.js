import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './../Login';

export default class Header extends Component {
  static propTypes = {
    updateUser: PropTypes.func,
  };

  render() {
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

          <Login updateUser={this.props.updateUser} />
        </div>
      </nav>
    );
  }
}
