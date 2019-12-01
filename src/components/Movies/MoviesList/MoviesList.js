import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './../MovieItem';
import MoviesHOC from './../MoviesHOC';

const MoviesList = ({ movies, user, session_id }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-12 col-md-6 mb-4">
          <MovieItem item={movie} user={user} session_id={session_id} />
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
  movies: PropTypes.array,
  user: PropTypes.object,
  session_id: PropTypes.string,
};

export default MoviesHOC(MoviesList);
