import React from 'react';

import AppContextHOC from '../../HOC/AppContextHOC';
import CallApi from '../../../api/api';

class MoviePage extends React.Component {
  state = {
    movie: null,
  };

  componentDidMount() {
    const { match } = this.props;

    CallApi.get(`/movie/${match.params.id}`).then(movie =>
      this.setState({ movie })
    );
  }

  render() {
    const { movie } = this.state;

    return (
      movie && (
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-6">
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt=""
              />
            </div>
            <div className="col col-md-6">text</div>
          </div>
        </div>
      )
    );
  }
}

export default AppContextHOC(MoviePage);
