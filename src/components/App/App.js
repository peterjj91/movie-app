import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MoviesPage from '../pages/MoviesPage';
import MoviePage from '../pages/MoviePage';
import Header from './../Header';
import Login from '../Login';
import CallApi from './../../api/api';

const cookies = new Cookies();

export const AppContext = React.createContext();

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      auth: {
        user: null,
        session_id: null,
      },
      showModal: false,
    };

    this.state = this.initialState;
  }

  updateAuth = ({ user, session_id }) => {
    this.setState(prevState => ({
      auth: {
        ...prevState.auth,
        user,
        session_id,
      },
    }));

    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
  };

  onLogOut = () => {
    cookies.remove('session_id');
  };

  toggleModalLogin = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));

  componentDidMount() {
    const session_id = cookies.get('session_id');

    if (session_id && session_id !== 'null') {
      CallApi.get(`/account`, {
        params: {
          session_id: session_id,
        },
      }).then(user => {
        this.updateAuth({ user, session_id });
      });
    }
  }

  render() {
    const { showModal, auth } = this.state;
    const session_id = cookies.get('session_id');

    return (
      <AppContext.Provider
        value={{
          auth: auth,
          updateAuth: this.updateAuth,
          onLogOut: this.onLogOut,
          toggleModalLogin: this.toggleModalLogin,
          showModal: showModal,
          session_id: session_id,
        }}
      >
        <Router>
          <Header />

          <div className="content">
            <Switch>
              <Route path="/movie/:id" component={MoviePage} />
              <Route exec path="/" component={MoviesPage} />
            </Switch>
          </div>

          <Login />
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
