import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
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
    page: PropTypes.number,
    onChangePage: PropTypes.func,
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
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    const { filters, page } = this.props;

    if (JSON.stringify(filters) !== JSON.stringify(prevProps.filters)) {
      this.props.onChangePage(1);
      this.getMovies(filters, 1);
    }

    if (JSON.stringify(page) !== JSON.stringify(prevProps.page)) {
      this.getMovies(filters, page);
    }
  }

  onResetFilters = () => {
    this.getMovies(this.props.filters, this.props.page);
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
