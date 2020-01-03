import React from 'react';
import classnames from 'classnames';

import Image from '../../../components/UIComponents/Image';
import ToggleFavorite from '../../../components/UIComponents/ToggleFavorite';
import ToggleWatchlist from '../../../components/UIComponents/ToggleWatchlist';
import styles from './styles.module.scss';

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

        <ul
          className={classnames(
            'list-group list-group-horizontal-md movie__list',
            styles.list
          )}
        >
          <li className={classnames('list-group-item', styles.item)}>
            <ToggleFavorite id={movie.id} className={styles.toggleButton}>
              в избранное
            </ToggleFavorite>
          </li>
          <li className={classnames('list-group-item', styles.item)}>
            <ToggleWatchlist id={movie.id} className={styles.toggleButton}>
              в список просмотра
            </ToggleWatchlist>
          </li>
        </ul>
      </div>
    </div>
  );
}
