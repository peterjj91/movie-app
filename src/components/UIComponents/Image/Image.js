import React from 'react';
import PropTypes from 'prop-types';

import { IMAGE_URL } from '../../../api/api';

export default function Image({ poster_path, ...rest }) {
  return (
    <img
      src={`${IMAGE_URL}/w600_and_h900_bestv2${poster_path}`}
      alt=""
      className="img-fluid card-img-top card-img--height"
      {...rest}
    />
  );
}

Image.propTypes = {
  poster_path: PropTypes.string,
};
