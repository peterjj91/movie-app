import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './../MovieItem';
import MoviesHOC from './../MoviesHOC';

const MoviesList = ({ movies, onFavorite, onWatchlist }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-12 col-md-6 mb-4">
          <MovieItem
            item={movie}
            onFavorite={onFavorite}
            onWatchlist={onWatchlist}
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
  onFavorite: PropTypes.func.isRequired,
  onWatchlist: PropTypes.func.isRequired,
};

export default MoviesHOC(MoviesList);
