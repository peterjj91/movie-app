import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { API_URL, API_KEY_3 } from './../../api/api';

export default class Genres extends PureComponent {
  constructor() {
    super();

    this.state = {
      all_genres: [],
      showGenres: false,
    };
  }

  static propTypes = {
    with_genres: PropTypes.array,
    onChangeFilters: PropTypes.func,
    filters: PropTypes.object,
  };

  onChangeGenre = event => {
    const name = event.target.name;
    const value = Number(event.target.value);
    const checked = event.target.checked;

    const updateGenres = checked
      ? [...this.props.with_genres, value]
      : this.props.with_genres.filter(genre => Number(genre) !== Number(value));

    this.props.onChangeFilters({ target: { name, value: updateGenres } });
  };

  getGenres = () => {
    let queryForLink = queryString.stringify(
      {
        api_key: API_KEY_3,
        language: 'ru-RU',
      },
      { arrayFormat: 'comma' }
    );

    const link = `${API_URL}/genre/movie/list?${queryForLink}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          all_genres: data.genres,
        });
      });
  };

  onShowGenres = () => {
    this.setState({ showGenres: !this.state.showGenres });
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const { all_genres } = this.state;
    const { with_genres } = this.props;

    return (
      <div className="form-group">
        <button
          type="button"
          className="btn btn-outline-dark btn-block mb-3"
          onClick={this.onShowGenres}
        >
          Показать все жанры
        </button>

        {this.state.showGenres &&
          all_genres.map(genre => {
            return (
              <div className="form-group form-check" key={genre.id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`genre-${genre.id}`}
                  name="with_genres"
                  checked={with_genres.includes(genre.id)}
                  value={genre.id}
                  onChange={this.onChangeGenre}
                />
                <label
                  htmlFor={`genre-${genre.id}`}
                  className="form-check-label"
                >
                  {genre.name}
                </label>
              </div>
            );
          })}
      </div>
    );
  }
}
