import React from 'react';
import PropTypes from 'prop-types';

export default function MovieDetail({ movie }) {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th scope="row">Статус </th>
          <td>{movie.status}</td>
        </tr>
        <tr>
          <th scope="row">Дата выхода</th>
          <td>{movie.release_date}</td>
        </tr>
        <tr>
          <th scope="row">Продолжительность</th>
          <td>{movie.runtime} минут</td>
        </tr>
        <tr>
          <th scope="row">Язык оригинала</th>
          <td>{movie.original_language}</td>
        </tr>
        <tr>
          <th scope="row">Страна</th>
          <td>
            {movie.production_countries.map(country => (
              <span key={country.name} className="mr-2">
                {country.name}
              </span>
            ))}
          </td>
        </tr>
        <tr>
          <th scope="row">Бюджет</th>
          <td>{movie.budget}$</td>
        </tr>
        <tr>
          <th scope="row">Сборы</th>
          <td>{movie.revenue}$</td>
        </tr>
        <tr>
          <th scope="row">Компания</th>
          <td>
            {movie.production_companies.map(company => (
              <div key={company.id}>
                <span className="badge badge-info mr-4">{company.name}</span>
              </div>
            ))}
          </td>
        </tr>
        <tr>
          <th scope="row">Жанры</th>
          <td>
            {movie.genres.map(genre => (
              <div key={genre.id}>
                <span className="badge badge-info mr-4">{genre.name}</span>
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

MovieDetail.propTypes = {
  movie: PropTypes.object,
};
