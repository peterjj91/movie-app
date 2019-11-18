import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './../MovieItem';
import MoviesHOC from './../MoviesHOC';

const MoviesList = ({ movies, onToggleFavorite, onToggleWatchlist }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-12 col-md-6 mb-4">
          <MovieItem
            item={movie}
            onToggleFavorite={onToggleFavorite}
            onToggleWatchlist={onToggleWatchlist}
          />
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onToggleWatchlist: PropTypes.func.isRequired,
};

export default MoviesHOC(MoviesList);
