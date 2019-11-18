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

    onFavorite = id => {
      const { session_id, user } = this.props;

      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id,
        },
        body: {
          media_type: 'movie',
          media_id: id,
          favorite: true,
        },
      })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log('onFavorite', error);
        });
    };

    onWatchlist = () => {
      console.log('onWatchlist');
    };

    render() {
      const { movies } = this.state;

      return (
        <Component
          movies={movies}
          onFavorite={this.onFavorite}
          onWatchlist={this.onWatchlist}
        />
      );
    }
  };
