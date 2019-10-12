import React, { Component } from 'react';
import Filters from './../Filters';
import MoviesList from './../Movies/MoviesList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: 'popularity.desc',
      },
    };
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

  render() {
    const { filters } = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList filters={filters} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
