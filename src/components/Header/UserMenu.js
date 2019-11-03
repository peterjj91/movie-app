import React from 'react';
import PropTypes from 'prop-types';
import AppContextHOC from './../HOC/AppContextHOC';

class UserMenu extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          width="40"
          className="rounded-circle"
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
          alt=""
        />
      </div>
    );
  }
}

export default AppContextHOC(UserMenu);
