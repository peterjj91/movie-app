import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './../MovieItem';
import MoviesHOC from './../MoviesHOC';

const MoviesList = ({
  movies,
  favoriteMovies,
  moviesWatchlist,
  onToggleFavoriteMovies,
  onToggleMoviesWatchlist,
}) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-12 col-md-6 mb-4">
          <MovieItem
            item={movie}
            favoriteMovies={favoriteMovies}
            moviesWatchlist={moviesWatchlist}
            onToggleFavoriteMovies={onToggleFavoriteMovies}
            onToggleMoviesWatchlist={onToggleMoviesWatchlist}
          />
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: [],
  user: {},
  session_id: '',
};

MoviesList.propTypes = {
  favoriteMovies: PropTypes.array,
  moviesWatchlist: PropTypes.array,
  movies: PropTypes.array,
  onToggleFavoriteMovies: PropTypes.func,
  onToggleMoviesWatchlist: PropTypes.func,
};

export default MoviesHOC(MoviesList);
