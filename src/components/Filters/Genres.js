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
    onChangeFilters: PropTypes.func,
    filters: PropTypes.object,
  };

  onChangeGenre = event => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;
    let bubblingObject = {};

    if (checked) {
      bubblingObject = {
        target: {
          name,
          value: [...this.props.with_genres, value],
        },
      };
    } else {
      bubblingObject = {
        target: {
          name,
          value: this.props.with_genres.filter(
            genre => Number(genre) !== Number(value)
          ),
        },
      };
    }

    this.props.onChangeFilters(bubblingObject);
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
    const { with_genres } = this.props;

    return (
      <div className="form-group">
        <label>Жанры:</label>
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
                onChange={this.onChangeGenre}
              />
              <label htmlFor={`genre-${genre.id}`} className="form-check-label">
                {genre.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
