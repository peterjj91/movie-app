import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Filters from './../Filters';
import MoviesContainer from './../Movies/MoviesContainer';
import Header from './../Header';
import { API_URL, API_KEY_3, fetchApi } from './../../api/api';

const cookies = new Cookies();

export const AppContext = React.createContext();

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: new Date().getFullYear().toString(),
        with_genres: [],
        page: 1,
      },
      total_pages: 1,
    };

    this.state = this.initialState;
  }

  updateUser = user => {
    this.setState({ user });
  };

  updateSessionId = session_id => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
    this.setState({ session_id });
  };

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  onChangeTotalPage = pages => {
    this.setState({ total_pages: pages });
  };

  onResetFilters = () => {
    this.setState(this.initialState);
  };

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  render() {
    const { filters, total_pages, user } = this.state;

    return (
      <AppContext.Provider
        value={{
          user: user,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          session_id: this.state.session_id,
        }}
      >
        <Header user={user} />

        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    total_pages={total_pages}
                    onResetFilters={this.onResetFilters}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesContainer
                filters={filters}
                total_pages={total_pages}
                onChangeTotalPage={this.onChangeTotalPage}
                onChangeFilters={this.onChangeFilters}
              />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
