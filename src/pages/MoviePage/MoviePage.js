import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import Spinner from '../../components/UIComponents/Spinner';
import MovieDescription from './MovieDescription';
import MovieDetail from './MovieDetail';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';
import AppContextHOC from '../../components/HOC/AppContextHOC';
import CallApi from '../../api/api';

class MoviePage extends React.Component {
  static propTypes = {
    movie: PropTypes.array,
    activeTab: PropTypes.string,
    loading: PropTypes.bool,
  };

  state = {
    loading: false,
    movie: {},
    activeTab: null,
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  componentDidMount() {
    const { match } = this.props;

    this.setState({ loading: true });

    CallApi.get(`/movie/${match.params.id}`)
      .then(movie => this.setState({ movie }))
      .then(() => {
        this.setState(prevState => ({
          activeTab: match.params.tab ? match.params.tab : 'detail',
          loading: false,
        }));
      });
  }

  render() {
    const { movie, activeTab, loading } = this.state;
    const { match } = this.props;

    return (
      <div className="container-fluid">
        {loading ? (
          <Spinner className="spinner--center" />
        ) : (
          <>
            <MovieDescription movie={movie} />

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
                  className="nav-link"
                  onClick={() => {
                    this.toggleTab('videos');
                  }}
                >
                  Видео
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to={`/movie/${match.params.id}/credits`}
                  className="nav-link"
                  onClick={() => {
                    this.toggleTab('credits');
                  }}
                >
                  Актёры
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="pt-3">
              <TabPane id="detail">
                {activeTab === 'detail' && <MovieDetail movie={movie} />}
              </TabPane>
              <TabPane id="videos">
                {activeTab === 'videos' && <MovieVideos movie={movie} />}
              </TabPane>
              <TabPane id="credits">
                {activeTab === 'credits' && <MovieCredits movie={movie} />}
              </TabPane>
            </TabContent>
          </>
        )}
      </div>
    );
  }
}

export default AppContextHOC(MoviePage);
