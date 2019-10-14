import React, { Component } from 'react';
import Filters from './../Filters';
import MoviesList from './../Movies/MoviesList';

const initialState = {
  filters: {
    sort_by: 'popularity.desc',
    primary_release_year: new Date().getFullYear().toString(),
    with_genres: [],
  },
  page: 1,
  total_pages: 1,
};

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
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

  onChangeGenre = event => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked === true) {
      return this.setState(({ filters }) => {
        let oldGenres = [...filters.with_genres];
        oldGenres.push(value);

        return {
          filters: {
            ...filters,
            with_genres: oldGenres,
          },
        };
      });
    }

    if (checked === false) {
      return this.setState(({ filters }) => {
        const idx = filters.with_genres.indexOf(value);

        const newArray = [
          ...filters.with_genres.slice(0, idx),
          ...filters.with_genres.slice(idx + 1),
        ];

        return {
          filters: {
            ...filters,
            with_genres: newArray,
          },
        };
      });
    }
  };

  onChangePage = page => {
    this.setState({
      page,
    });
  };

  onResetFilters = event => {
    event.preventDefault();

    this.setState(initialState);
  };

  getTotalPage = pages => {
    this.setState({ total_pages: pages });
  };

  render() {
    const { filters, page, total_pages, with_genres } = this.state;

    return (
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: '100%' }}>
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
                  onChangeGenre={this.onChangeGenre}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              getTotalPage={this.getTotalPage}
              allPages={total_pages}
              onResetFilters={this.onResetFilters}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
