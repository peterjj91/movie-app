import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import ToggleFavorite from '../../ToggleFavorite';
import ToggleWatchlist from '../../ToggleWatchlist';
import MovieDetail from './MovieDetail';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';
import AppContextHOC from '../../HOC/AppContextHOC';
import CallApi from '../../../api/api';

class MoviePage extends React.Component {
  state = {
    movie: null,
    activeTab: null,
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  componentDidMount() {
    const { match } = this.props;

    CallApi.get(`/movie/${match.params.id}`).then(movie =>
      this.setState({ movie })
    );
    this.setState({
      activeTab: match.params.tab ? match.params.tab : 'detail',
    });
  }

  render() {
    const { movie, activeTab } = this.state;
    const { match } = this.props;

    return (
      movie && (
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt=""
                className="img-fluid card-img-top card-img--height"
              />
            </div>
            <div className="col col-md-8">
              <h2 className="mb-5">{movie.title}</h2>

              <p className="mb-5">{movie.overview}</p>

              <p className="mb-5">
                Рейтинг Пользователей: {movie.vote_average}
              </p>

              <ul className="list-group list-group-horizontal-md movie__list">
                <li className="list-group-item">
                  <ToggleFavorite id={movie.id} className="icon" /> в избранное
                </li>
                <li className="list-group-item">
                  <ToggleWatchlist id={movie.id} className="icon" /> в список просмотра
                </li>
              </ul>
            </div>
          </div>

          <Nav tabs>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to={`/movie/${match.params.id}/detail`}
                className={classnames('nav-link', {
                  active: activeTab === 'detail',
                })}
                onClick={() => {
                  this.toggleTab('detail');
                }}
              >
                Детали
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to={`/movie/${match.params.id}/videos`}
                className={classnames('nav-link', {
                  active: activeTab === 'videos',
                })}
                onClick={() => {
                  this.toggleTab('videos');
                }}
              >
                Похожие фильмы
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to={`/movie/${match.params.id}/credits`}
                className={classnames('nav-link', {
                  active: activeTab === 'credits',
                })}
                onClick={() => {
                  this.toggleTab('credits');
                }}
              >
                Актёры
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="pt-3">
            <TabPane tabId="detail">
              <MovieDetail />
            </TabPane>
            <TabPane tabId="videos">
              <MovieVideos />
            </TabPane>
            <TabPane tabId="credits">
              <MovieCredits />
            </TabPane>
          </TabContent>
        </div>
      )
    );
  }
}

MoviePage.propTypes = {
  movie: PropTypes.array,
  activeTab: PropTypes.string,
};

export default AppContextHOC(MoviePage);
