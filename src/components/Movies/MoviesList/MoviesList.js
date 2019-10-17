import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import _ from 'lodash';
import MovieItem from './../MovieItem';
import { API_URL, API_KEY_3 } from './../../../api/api';

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  static propTypes = {
    // page: PropTypes.number,
    total_pages: PropTypes.number,
    onChangeFilters: PropTypes.func,
    movies: PropTypes.object,
    onChangeTotalPage: PropTypes.func,
    filters: PropTypes.object,
  };

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;

    let queryForLink = queryString.stringify(
      {
        api_key: API_KEY_3,
        language: 'ru-RU',
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
        with_genres: with_genres.map(e => e.id),
      },
      { arrayFormat: 'comma' }
    );

    const link = `${API_URL}/discover/movie?${queryForLink}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
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
    const { filters, total_pages } = this.props;

    if (!_.isEqual(filters, prevProps.filters)) {
      this.props.onChangeFilters({
        target: {
          name: 'page',
          value: !_.isEqual(filters.with_genres, prevProps.filters.with_genres)
            ? 1
            : filters.page,
        },
      });
      this.getMovies(filters, filters.page);
    }

    if (total_pages !== prevProps.total_pages) {
      this.getMovies(filters, 1);
    }
  }

  onResetFilters = () => {
    this.getMovies(this.props.filters, this.props.filters.page);
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-12 col-md-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
