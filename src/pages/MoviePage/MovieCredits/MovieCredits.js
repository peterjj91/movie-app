import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import CallApi, { IMAGE_URL } from '../../../api/api';

import Spinner from '../../../components/UIComponents/Spinner';

function MovieCredits({ match }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CallApi.get(`/movie/${match.params.id}/credits`)
      .then(credits => setCast(credits.cast))
      .then(() => setLoading(false));
  }, [match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="row">
      {cast.map(actor => (
        <div key={actor.id} className="col col-md-2 mb-3">
          <div className="mb-3">
            <img
              src={`${IMAGE_URL}/w500${actor.profile_path}`}
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

export default withRouter(MovieCredits);
