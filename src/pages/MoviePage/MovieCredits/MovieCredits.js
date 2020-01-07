import React from 'react';
import { withRouter } from 'react-router';
import { useCast } from '../../../libs/hooksLib';
import { IMAGE_URL } from '../../../api/api';

import Spinner from '../../../components/UIComponents/Spinner';

function MovieCredits() {
  const [loading, data] = useCast('credits');

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="row">
      {data.cast.map(actor => (
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
