import React from 'react';

import Image from '../../../components/UIComponents/Image';
import ToggleFavorite from '../../../components/UIComponents/ToggleFavorite';
import ToggleWatchlist from '../../../components/UIComponents/ToggleWatchlist';

export default function MovieDescription({ movie }) {
  return (
    <div className="row mb-4">
      <div className="col col-md-4">
        <Image poster_path={movie.poster_path} />
      </div>
      <div className="col col-md-8">
        <h2 className="mb-5">{movie.title}</h2>

        <p className="mb-5">{movie.overview}</p>

        <p className="mb-5">Рейтинг Пользователей: {movie.vote_average}</p>

        <ul className="list-group list-group-horizontal-md movie__list">
          <li className="list-group-item">
            <ToggleFavorite id={movie.id} className="icon" /> в избранное
          </li>
          <li className="list-group-item">
            <ToggleWatchlist id={movie.id} className="icon" /> в список
            просмотра
          </li>
        </ul>
      </div>
    </div>
  );
}
