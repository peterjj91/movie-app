import React from 'react';

export default function Image({ poster_path, ...rest }) {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
      alt=""
      className="img-fluid card-img-top card-img--height"
      {...rest}
    />
  );
}
