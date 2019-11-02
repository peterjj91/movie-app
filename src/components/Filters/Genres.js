import React from 'react';
import PropTypes from 'prop-types';

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
          <div className="form-group form-check" key={genre.id}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`genre-${genre.id}`}
              name="with_genres"
              checked={with_genres.includes(genre.id)}
              value={genre.id}
              onChange={onChangeGenre}
            />
            <label htmlFor={`genre-${genre.id}`} className="form-check-label">
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

export default Genres;
