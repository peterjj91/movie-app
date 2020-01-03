import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import _ from 'lodash';

import MoviesPage from '../../pages/MoviesPage';
import MoviePage from '../../pages/MoviePage';
import Header from './../Header';
import Login from '../Login';
import CallApi from './../../api/api';

const cookies = new Cookies();

export const AppContext = React.createContext();

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      auth: {
        user: null,
        session_id: null,
      },
      showModal: false,
      favoriteMovies: [],
      moviesWatchlist: [],
    };

    this.state = this.initialState;
  }

  updateAuth = ({ user, session_id }) => {
    this.setState(prevState => ({
      auth: {
        ...prevState.auth,
        user,
        session_id,
      },
    }));

    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
  };

  onLogOut = () => {
    cookies.remove('session_id');
  };

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
    const {
      loadingFavoriteMovies,
      loadingMoviesWatchlist,
      auth: { user, session_id },
    } = this.state;

    if (!_.isEqual(prevState.auth, this.state.auth) && user) {
      this.getFavoriteMovies(user, session_id);
      this.getMoviesWatchlist(user, session_id);
    }

    // delete movies on logout
    if (!this.state.auth.session_id && prevState.auth.session_id) {
      this.setState({
        ...this.state,
        favoriteMovies: [],
        moviesWatchlist: [],
      });
    }

    if (prevState.loadingFavoriteMovies !== loadingFavoriteMovies) {
      this.getFavoriteMovies(user, session_id);
    }

    if (prevState.loadingMoviesWatchlist !== loadingMoviesWatchlist) {
      this.getMoviesWatchlist(user, session_id);
    }
  }

  componentDidMount() {
    const session_id = cookies.get('session_id');

    if (session_id && session_id !== 'null') {
      CallApi.get(`/account`, {
        params: {
          session_id: session_id,
        },
      }).then(user => {
        this.updateAuth({ user, session_id });
        this.getFavoriteMovies(user, session_id);
        this.getMoviesWatchlist(user, session_id);
      });
    }
  }

  render() {
    const { showModal, auth, favoriteMovies, moviesWatchlist } = this.state;

    return (
      <AppContext.Provider
        value={{
          auth: auth,
          updateAuth: this.updateAuth,
          onLogOut: this.onLogOut,
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

export default App;
