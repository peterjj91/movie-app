import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CallApi from '../../../api/api';

export default Component =>
  class MoviesHOC extends PureComponent {
    constructor() {
      super();

      this.state = {
        movies: [],
      };
    }

    static propTypes = {
      total_pages: PropTypes.number,
      onChangeFilters: PropTypes.func,
      movies: PropTypes.object,
      favoriteMovies: PropTypes.array,
      moviesWatchlist: PropTypes.array,
      getFavoriteMovies: PropTypes.func,
      getMoviesWatchlist: PropTypes.func,
      onChangeTotalPage: PropTypes.func,
      filters: PropTypes.object,
      user: PropTypes.object,
      id: PropTypes.number,
      session_id: PropTypes.string,
    };

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;

      let queryForLink = {
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
        with_genres: with_genres,
      };

      CallApi.get('/discover/movie', {
        params: queryForLink,
      }).then(data => {
        this.props.onChangeTotalPage(data.total_pages);
        this.setState({
          movies: data.results,
        });
      });
    };

    onToggleFavorite = id => {
      const {
        session_id,
        user,
        getFavoriteMovies,
        favoriteMovies,
      } = this.props;

      const queryBody = {
        params: {
          session_id: session_id,
        },
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: !favoriteMovies.some(film => film.id === id),
        },
      };

      CallApi.post(`/account/${user.id}/favorite`, queryBody)
        .then(() => {
          getFavoriteMovies(user, session_id);
        })
        .catch(error => {
          console.log('onToggleFavorite error -', error);
        });
    };

    onToggleWatchlist = id => {
      const {
        session_id,
        user,
        getMoviesWatchlist,
        moviesWatchlist,
      } = this.props;

      const queryBody = {
        params: {
          session_id: session_id,
        },
        body: {
          media_type: 'movie',
          media_id: id,
          watchlist: !moviesWatchlist.some(film => film.id === id),
        },
      };

      CallApi.post(`/account/${user.id}/watchlist`, queryBody)
        .then(() => {
          getMoviesWatchlist(user, session_id);
        })
        .catch(error => {
          console.log('onToggleWatchlist error -', error);
        });
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.filters.page);
    }

    componentDidUpdate(prevProps) {
      const { filters } = this.props;

      if (!_.isEqual(filters, prevProps.filters)) {
        this.props.onChangeFilters({
          target: {
            name: 'page',
            value: !_.isEqual(filters.page, prevProps.filters.page)
              ? filters.page
              : 1,
          },
        });
        this.getMovies(filters, filters.page);
      }
    }

    onResetFilters = () => {
      this.getMovies(this.props.filters, this.props.filters.page);
    };

    render() {
      const { movies } = this.state;
      const { user, session_id } = this.props;

      return (
        <Component
          movies={movies}
          user={user}
          session_id={session_id}
          onToggleFavorite={this.onToggleFavorite}
          onToggleWatchlist={this.onToggleWatchlist}
        />
      );
    }
  };
