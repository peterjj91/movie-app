import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import _ from 'lodash';
import Filters from './../Filters';
import MoviesList from './../Movies/MoviesList';
import Header from './../Header';
import CallApi from './../../api/api';
import Login from '../Login';

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
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: new Date().getFullYear().toString(),
        with_genres: [],
        page: 1,
      },
      showModal: false,
      loadingFavoriteMovies: false,
      loadingMoviesWatchlist: false,
      favoriteMovies: [],
      moviesWatchlist: [],
      total_pages: 1,
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

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  onChangeTotalPage = pages => {
    this.setState({ total_pages: pages });
  };

  onToggleFavoriteMovies = () => {
    this.setState({
      loadingFavoriteMovies: !this.state.loadingFavoriteMovies,
    });
  };

  onToggleMoviesWatchlist = () => {
    this.setState({
      loadingMoviesWatchlist: !this.state.loadingMoviesWatchlist,
    });
  };

  onResetFilters = () => {
    this.setState(this.initialState);
  };

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

  toggleModalLogin = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));

  componentDidUpdate(prevProps, prevState) {
    const {
      auth: { user, session_id },
      loadingFavoriteMovies,
      loadingMoviesWatchlist
    } = this.state;

    if (!_.isEqual(prevState.auth, this.state.auth) && user) {
      this.getFavoriteMovies(user, session_id);
      this.getMoviesWatchlist(user, session_id);
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
    const {
      filters,
      total_pages,
      favoriteMovies,
      moviesWatchlist,
      showModal,
      auth,
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          auth: auth,
          updateAuth: this.updateAuth,
          session_id: this.state.session_id,
          onLogOut: this.onLogOut,
          getFavoriteMovies: this.getFavoriteMovies,
          getMoviesWatchlist: this.getMoviesWatchlist,
          onToggleFavoriteMovies: this.onToggleFavoriteMovies,
          onToggleMoviesWatchlist: this.onToggleMoviesWatchlist,
          favoriteMovies: favoriteMovies,
          moviesWatchlist: moviesWatchlist,
          toggleModalLogin: this.toggleModalLogin,
          showModal: showModal,
        }}
      >
        <Header />

        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    total_pages={total_pages}
                    onResetFilters={this.onResetFilters}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                total_pages={total_pages}
                onChangeTotalPage={this.onChangeTotalPage}
                onChangeFilters={this.onChangeFilters}
                session_id={auth.session_id}
                favoriteMovies={favoriteMovies}
                getFavoriteMovies={this.getFavoriteMovies}
                moviesWatchlist={moviesWatchlist}
                getMoviesWatchlist={this.getMoviesWatchlist}
                toggleModalLogin={this.toggleModalLogin}
                showModal={showModal}
              />
            </div>
          </div>
        </div>

        <Login />
      </AppContext.Provider>
    );
  }
}

export default App;
