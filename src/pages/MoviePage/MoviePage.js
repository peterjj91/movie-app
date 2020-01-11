import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Nav, TabContent, TabPane } from 'reactstrap';

import Spinner from '../../components/UIComponents/Spinner';
import MovieDescription from './MovieDescription';
import MovieNavItem from './MovieNavItem';
import MovieDetail from './MovieDetail';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';
import AppContextHOC from '../../components/HOC/AppContextHOC';
import CallApi from '../../api/api';

const dataTabs = [
  { id: 0, title: 'detail', text: 'Детали' },
  { id: 1, title: 'videos', text: 'Видео' },
  { id: 2, title: 'credits', text: 'Актёры' },
];

function MoviePage({ match, history }) {
  const [state, setState] = useState({
    loading: true,
    movie: {},
  });

  const toggleTab = tab => {
    if (state.activeTab !== tab) {
      setState(prevState => ({ ...prevState, activeTab: tab }));
    }
  };

  useEffect(() => {
    const id = match.params.id;
    const { pathname } = history.location;

    CallApi.get(`/movie/${id}`).then(movie =>
      setState(prevState => ({
        ...prevState,
        movie: movie,
        loading: !prevState.loading,
      }))
    );

    if (`/movie/${id}/` === pathname || `/movie/${id}` === pathname) {
      history.push(`/movie/${id}/detail`);
    }
  }, [match.params.id, setState, history]);

  return (
    <div className="container-fluid">
      {state.loading ? (
        <Spinner className="spinner--center" />
      ) : (
        <>
          <MovieDescription movie={state.movie} />

          <Nav tabs active={state.activeTab}>
            {dataTabs.map(({ id, title, text }) => {
              return (
                <MovieNavItem
                  key={id}
                  onChange={toggleTab}
                  title={title}
                  text={text}
                />
              );
            })}
          </Nav>

          <TabContent className="pt-3">
            <TabPane>
              <Switch>
                <Route path="/movie/:id/detail">
                  <MovieDetail movie={state.movie} />
                </Route>
                <Route path="/movie/:id/videos">
                  <MovieVideos movie={state.movie} />
                </Route>
                <Route path="/movie/:id/credits">
                  <MovieCredits movie={state.movie} />
                </Route>
              </Switch>
            </TabPane>
          </TabContent>
        </>
      )}
    </div>
  );
}

MoviePage.propTypes = {
  match: PropTypes.object.isRequired,
  movie: PropTypes.array,
  activeTab: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.object,
};

export default AppContextHOC(MoviePage);
