import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import _ from 'lodash';
import MoviesList from './../MoviesList';
import { API_URL, API_KEY_3 } from '../../../api/api';

export default class MoviesContainer extends PureComponent {
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
        with_genres: with_genres,
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

    return <MoviesList movies={movies} />;
  }
}