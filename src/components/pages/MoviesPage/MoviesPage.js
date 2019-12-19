import React, { Component } from 'react';
import _ from 'lodash';
import Filters from '../../Filters';
import MoviesList from '../../Movies/MoviesList';
import AppContextHOC from '../../HOC/AppContextHOC';
import CallApi from '../../../api/api';

class MoviesPage extends Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: new Date().getFullYear().toString(),
        with_genres: [],
        page: 1,
      },
      loadingFavoriteMovies: false,
      loadingMoviesWatchlist: false,
      favoriteMovies: [],
      moviesWatchlist: [],
      total_pages: 1,
    };

    this.state = this.initialState;
  }

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

  componentDidUpdate(prevProps, prevState) {
    const { loadingFavoriteMovies, loadingMoviesWatchlist } = this.state;
    const {
      auth: { user, session_id },
    } = this.props;

    if (!_.isEqual(prevProps.auth, this.props.auth) && user) {
      this.getFavoriteMovies(user, session_id);
      this.getMoviesWatchlist(user, session_id);
    }

    // delete movies on logout session
    if (!this.props.session_id && prevProps.session_id) {
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
    const { session_id } = this.props;

    if (session_id && session_id !== 'null') {
      CallApi.get(`/account`, {
        params: {
          session_id: session_id,
        },
      }).then(user => {
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
    } = this.state;
    const { toggleModalLogin } = this.props;

    return (
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
              favoriteMovies={favoriteMovies}
              getFavoriteMovies={this.getFavoriteMovies}
              moviesWatchlist={moviesWatchlist}
              getMoviesWatchlist={this.getMoviesWatchlist}
              toggleModalLogin={toggleModalLogin}
              onToggleFavoriteMovies={this.onToggleFavoriteMovies}
              onToggleMoviesWatchlist={this.onToggleMoviesWatchlist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviesPage);
