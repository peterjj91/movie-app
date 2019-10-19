import React, { Component } from 'react';
import Login from './../Login';

export default class Header extends Component {
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

          <Login />
        </div>
      </nav>
    );
  }
}
