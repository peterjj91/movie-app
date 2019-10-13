import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    onTotalPage: PropTypes.func,
    filters: PropTypes.object,
  };

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.onTotalPage(data.total_pages);
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

    if (filters.sort_by !== prevProps.filters.sort_by) {
      this.props.onChangePage(1);
      this.getMovies(filters, 1);
    }

    if (
      filters.primary_release_year !== prevProps.filters.primary_release_year
    ) {
      this.props.onChangePage(1);
      this.getMovies(filters, 1);
    }

    if (page !== prevProps.page) {
      this.getMovies(filters, page);
    }
  }

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
