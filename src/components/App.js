import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import {
  updateAuth,
  onLogOut,
  toggleModalLogin,
  updateFavoriteMovies,
  updateMoviesWatchlist,
  fetchAuth,
  fetchFavoriteMovies,
  fetchMoviesWatchlist,
} from '../redux/auth/auth.actions';
import MoviesPage from '../pages/MoviesPage';
import MoviePage from '../pages/MoviePage';
import Header from './Header';
import Login from './Login';

export const AppContext = React.createContext();

class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    const {
      user,
      session_id,
      onLogOut,
      fetchFavoriteMovies,
      fetchMoviesWatchlist,
    } = this.props;
    // const { loadingFavoriteMovies, loadingMoviesWatchlist } = this.state;

    if (!_.isEqual(prevProps.user, user) && user) {
      fetchFavoriteMovies({ user, session_id });
      fetchMoviesWatchlist({ user, session_id });
    }

    // delete movies on logout
    if (!session_id && prevProps.session_id) {
      onLogOut();
    }

    // if (prevProps.loadingFavoriteMovies !== loadingFavoriteMovies) {
    //   fetchFavoriteMovies({ user, session_id });
    // }

    // if (prevProps.loadingMoviesWatchlist !== loadingMoviesWatchlist) {
    //   fetchMoviesWatchlist({ user, session_id });
    // }
  }

  componentDidMount() {
    const { session_id, fetchAuth } = this.props;

    if (session_id && session_id !== 'null') {
      fetchAuth({ session_id });
    }
  }

  render() {
    const {
      user,
      session_id,
      showLoginModal,
      updateAuth,
      onLogOut,
      toggleModalLogin,
      favoriteMovies,
      moviesWatchlist,
      fetchFavoriteMovies,
      fetchMoviesWatchlist,
    } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateAuth: updateAuth,
          onLogOut: onLogOut,
          toggleModalLogin: toggleModalLogin,
          showLoginModal: showLoginModal,
          favoriteMovies: favoriteMovies,
          moviesWatchlist: moviesWatchlist,
          fetchFavoriteMovies: fetchFavoriteMovies,
          fetchMoviesWatchlist: fetchMoviesWatchlist,
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
  showLoginModal: PropTypes.bool,
  favoriteMovies: PropTypes.array,
  moviesWatchlist: PropTypes.array,
  session_id: PropTypes.string,
  user: PropTypes.object,
  fetchAuth: PropTypes.func,
  updateAuth: PropTypes.func,
  onLogOut: PropTypes.func,
  toggleModalLogin: PropTypes.func,
  fetchFavoriteMovies: PropTypes.func,
  fetchMoviesWatchlist: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    showLoginModal: state.auth.showLoginModal,
    favoriteMovies: state.auth.favoriteMovies,
    moviesWatchlist: state.auth.moviesWatchlist,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     updateAuth: bindActionCreators(updateAuth, dispatch),
//     onLogOut: bindActionCreators(onLogOut, dispatch),
//     toggleModalLogin: bindActionCreators(toggleModalLogin, dispatch),
//   };
// };
const mapDispatchToProps = {
  updateAuth,
  onLogOut,
  toggleModalLogin,
  updateFavoriteMovies,
  updateMoviesWatchlist,
  fetchAuth,
  fetchFavoriteMovies,
  fetchMoviesWatchlist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
