import React, { Component } from 'react';
import Filters from './../Filters';
import MoviesList from './../Movies/MoviesList';

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: new Date().getFullYear().toString(),
        with_genres: [],
      },
      page: 1,
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

  onChangePage = page => {
    this.setState({
      page,
    });
  };

  onChangeTotalPage = pages => {
    this.setState({ total_pages: pages });
  };

  onResetFilters = event => {
    this.setState(this.initialState);
  };

  render() {
    const { filters, page, total_pages, with_genres } = this.state;

    return (
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  total_pages={total_pages}
                  onResetFilters={this.onResetFilters}
                  with_genres={with_genres}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              onChangeTotalPage={this.onChangeTotalPage}
              onResetFilters={this.onResetFilters}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
