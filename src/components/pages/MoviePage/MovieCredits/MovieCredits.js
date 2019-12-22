import React, { useEffect, useState } from 'react';
import CallApi from '../../../../api/api';

import Spinner from '../../../Spinner';

export default function MovieCredits({ movie }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CallApi.get(`/movie/${movie.id}/credits`)
      .then(credits => setCast(credits.cast))
      .then(() => setLoading(false));
  }, [movie.id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="row">
      {cast.map(actor => (
        <div key={actor.id} className="col col-md-2 mb-3">
          <div className="mb-3">
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="img-fluid"
            />
          </div>
          <div className="h6">
            <strong>{actor.name}</strong> as {actor.character}
          </div>
        </div>
      ))}
    </div>
  );
}
