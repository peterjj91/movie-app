import React, { Component } from 'react';
import Filters from './../Filters';
import MoviesList from './../Movies/MoviesList';
import Header from './../Header';

class App extends Component {
  constructor() {
    super();

    this.initialState = {
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

  render() {
    const { filters, total_pages } = this.state;

    return (
      <React.Fragment>
        <Header />

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
              <MoviesList
                filters={filters}
                total_pages={total_pages}
                onChangeTotalPage={this.onChangeTotalPage}
                onChangeFilters={this.onChangeFilters}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
