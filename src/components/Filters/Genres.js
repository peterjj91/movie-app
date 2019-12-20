import React from 'react';
import PropTypes from 'prop-types';
import GenresHOC from './GenresHOC';

const Genres = ({
  all_genres,
  with_genres,
  showGenres,
  onShowGenres,
  onChangeGenre,
}) => (
  <div className="form-group">
    <button
      type="button"
      className="btn btn-outline-dark btn-block mb-3"
      onClick={onShowGenres}
    >
      Показать все жанры
    </button>

    {showGenres &&
      all_genres.map(genre => {
        return (
          <div className="custom-control custom-checkbox" key={genre.id}>
            <input
              type="checkbox"
              className="custom-control-input"
              id={`genre-${genre.id}`}
              name="with_genres"
              checked={with_genres.includes(genre.id)}
              value={genre.id}
              onChange={onChangeGenre}
            />
            <label
              className="custom-control-label"
              htmlFor={`genre-${genre.id}`}
            >
              {genre.name}
            </label>
          </div>
        );
      })}
  </div>
);

Genres.defaultProps = {
  all_genres: [],
  with_genres: [],
  showGenres: false,
};

Genres.propTypes = {
  all_genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  showGenres: PropTypes.bool.isRequired,
  onShowGenres: PropTypes.func.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
};

export default GenresHOC(Genres);
