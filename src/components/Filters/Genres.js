import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_URL, API_KEY_3 } from './../../api/api';

export default class Genres extends Component {
  constructor() {
    super();

    this.state = {
      all_genres: [],
    };
  }

  static propTypes = {
    all_genres: PropTypes.array,
    with_genres: PropTypes.array,
    onChangeGenre: PropTypes.func,
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;

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

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const { all_genres } = this.state;
    const { with_genres, onChangeGenre } = this.props;

    return (
      <React.Fragment>
        {all_genres.map(genre => {
          const checkGenreForBool = with_genres.some(forCheck => {
            return genre.id === +forCheck;
          });

          return (
            <div className="form-group form-check" key={genre.id}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`genre-${genre.id}`}
                name="with_genres"
                checked={checkGenreForBool}
                value={genre.id}
                onChange={onChangeGenre}
              />
              <label htmlFor={`genre-${genre.id}`} className="form-check-label">
                {genre.name}
              </label>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
