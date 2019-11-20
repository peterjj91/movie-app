import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Filters from './../Filters';
import MoviesList from './../Movies/MoviesList';
import Header from './../Header';
import CallApi from './../../api/api';

const cookies = new Cookies();

export const AppContext = React.createContext();

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: new Date().getFullYear().toString(),
        with_genres: [],
        page: 1,
      },
      favoriteMovies: [],
      moviesWatchlist: [],
      total_pages: 1,
    };

    this.state = this.initialState;
  }

  updateUser = user => {
    this.setState({ user });
  };

  updateSessionId = session_id => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
    this.setState({ session_id });
  };

  onLogOut = () => {
    cookies.remove('session_id');
    this.setState({
      session_id: null,
      user: null,
    });
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

  onResetFilters = () => {
    this.setState(this.initialState);
  };

  getFavoriteMovies = (user, session_id) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
      },
    }).then(data => {
      console.log('getFavoriteMovies', data.results.map(i => i.id));
      this.setState({ favoriteMovies: data.results });
    });
  };

  getMoviesWatchlist = (user, session_id) => {
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
      },
    }).then(data => {
      console.log('getMoviesWatchlist', data.results.map(i => i.id));
      this.setState({ moviesWatchlist: data.results });
    });
  };

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      CallApi.get(`/account`, {
        params: {
          session_id: session_id,
        },
      }).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
        this.getFavoriteMovies(this.state.user, this.state.session_id);
        this.getMoviesWatchlist(this.state.user, this.state.session_id);
      });
    }
  }

  render() {
    const {
      filters,
      total_pages,
      user,
      session_id,
      favoriteMovies,
      moviesWatchlist,
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user: user,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          session_id: this.state.session_id,
          onLogOut: this.onLogOut,
          getFavoriteMovies: this.getFavoriteMovies,
          getMoviesWatchlist: this.getMoviesWatchlist,
          favoriteMovies: favoriteMovies,
          moviesWatchlist: moviesWatchlist,
        }}
      >
        <Header user={user} />

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
                user={user}
                onChangeTotalPage={this.onChangeTotalPage}
                onChangeFilters={this.onChangeFilters}
                session_id={session_id}
                favoriteMovies={favoriteMovies}
                getFavoriteMovies={this.getFavoriteMovies}
                moviesWatchlist={moviesWatchlist}
                getMoviesWatchlist={this.getMoviesWatchlist}
              />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
