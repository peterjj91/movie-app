import React, { useEffect, useState } from 'react';
import CallApi from '../../../api/api';

import Spinner from '../../../components/UIComponents/Spinner';

export default function MovieVideos({ movie }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CallApi.get(`/movie/${movie.id}/videos`)
      .then(videos => setVideos(videos.results))
      .then(() => setLoading(false));
  }, [movie.id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="row">
      {videos.map(video => {
        return (
          <div className="col-12 col-md-6" key={video.key}>
            <div className="embed-responsive embed-responsive-16by9 mb-3">
              <iframe
                title={video.name}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                className="embed-responsive-item"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );
      })}
    </div>
  );
}
