import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './../App/App';

class User extends React.Component {
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

const UserContainer = props => {
  return (
    <AppContext.Consumer>
      {context => <User {...props} user={context.user} />}
    </AppContext.Consumer>
  );
};

UserContainer.displayName = 'UserContainer';

export default UserContainer;
