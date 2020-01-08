import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
} from '../../actions/actions';
import MoviesPage from '../../pages/MoviesPage';
import MoviePage from '../../pages/MoviePage';
import Header from './../Header';
import Login from '../Login';
import CallApi from './../../api/api';

export const AppContext = React.createContext();

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      showModal: false,
      favoriteMovies: [],
      moviesWatchlist: [],
    };

    this.state = this.initialState;
  }

  // updateAuth = ({ user, session_id }) => {
  //   this.props.store.dispatch(
  //     actionCreatorUpdateAuth({
  //       user,
  //       session_id,
  //     })
  //   );
  // };

  // onLogOut = () => {
  //   this.props.store.dispatch(actionCreatorLogOut());
  // };

  toggleModalLogin = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));

  getFavoriteMovies = (user, session_id) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
      },
    }).then(data => {
      this.setState({ favoriteMovies: data.results });
    });
  };

  getMoviesWatchlist = (user, session_id) => {
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
      },
    }).then(data => {
      this.setState({ moviesWatchlist: data.results });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;
    const { loadingFavoriteMovies, loadingMoviesWatchlist } = this.state;

    if (!_.isEqual(prevState.auth, auth) && auth.user) {
      this.getFavoriteMovies(auth.user, auth.session_id);
      this.getMoviesWatchlist(auth.user, auth.session_id);
    }

    // delete movies on logout
    // if (!auth.session_id && prevState.auth.session_id) {
    //   this.setState({
    //     ...this.state,
    //     favoriteMovies: [],
    //     moviesWatchlist: [],
    //   });
    // }

    if (prevState.loadingFavoriteMovies !== loadingFavoriteMovies) {
      this.getFavoriteMovies(auth.user, auth.session_id);
    }

    if (prevState.loadingMoviesWatchlist !== loadingMoviesWatchlist) {
      this.getMoviesWatchlist(auth.user, auth.session_id);
    }
  }

  componentDidMount() {
    const {
      auth: { session_id },
    } = this.props;

    if (session_id && session_id !== 'null') {
      CallApi.get(`/account`, {
        params: {
          session_id,
        },
      }).then(user => {
        this.props.updateAuth({ user, session_id });
        this.getFavoriteMovies(user, session_id);
        this.getMoviesWatchlist(user, session_id);
      });
    }
  }

  render() {
    const { showModal, favoriteMovies, moviesWatchlist } = this.state;
    const { auth, updateAuth, onLogOut } = this.props;

    return (
      <AppContext.Provider
        value={{
          auth: auth,
          updateAuth: updateAuth,
          onLogOut: onLogOut,
          toggleModalLogin: this.toggleModalLogin,
          showModal: showModal,
          favoriteMovies: favoriteMovies,
          moviesWatchlist: moviesWatchlist,
          getFavoriteMovies: this.getFavoriteMovies,
          getMoviesWatchlist: this.getMoviesWatchlist,
        }}
      >
        <Router>
          <div className="wrapper">
            <div className="content">
              <Header />

              <Switch>
                <Route path="/movie/:id" component={MoviePage} />
                <Route exec path="/" component={MoviesPage} />
              </Switch>
            </div>
          </div>

          <Login />
        </Router>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object,
  showModal: PropTypes.bool,
  favoriteMovies: PropTypes.array,
  moviesWatchlist: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: ({ user, session_id }) =>
      dispatch(
        actionCreatorUpdateAuth({
          user,
          session_id,
        })
      ),
    onLogOut: () => dispatch(actionCreatorLogOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
