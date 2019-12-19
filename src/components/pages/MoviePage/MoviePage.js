import React from 'react';
import Icon from '@material-ui/core/Icon';

// import ToggleFavorite from '../../../components/Movies/ToggleFavorite';
// import ToggleWatchlist from '../../../components/Movies/ToggleWatchlist';
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
            <div className="col col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col col-md-8">
              <h2 className="mb-5">{movie.title}</h2>

              <p className="mb-5">{movie.overview}</p>

              <ul className="list-group list-group-horizontal-md movie__list">
                <li className="list-group-item">
                  <Icon className="mr-2">bookmark</Icon>в избранное
                </li>
                <li className="list-group-item">
                  <Icon className="mr-2">star</Icon>в список просмотра
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default AppContextHOC(MoviePage);
