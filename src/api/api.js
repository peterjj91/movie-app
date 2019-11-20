import queryString from 'query-string';

export const API_URL = 'https://api.themoviedb.org/3';

export const API_KEY_3 = '1b65d0b8218370f2ca901397cbb76132';

export const API_KEY_4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjY1ZDBiODIxODM3MGYyY2E5MDEzOTdjYmI3NjEzMiIsInN1YiI6IjVkYTBiMzI4YWUzNjY4MDAxMzIxNTRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ncLEPY-yeDCBxr2UeoXAxA9jw7SRTwcVHZ-LABY-_44';

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    let queryForLink = queryString.stringify(
      {
        api_key: API_KEY_3,
        language: 'ru-RU',
        ...params,
      },
      { arrayFormat: 'comma' }
    );

    return fetchApi(`${API_URL}${url}?${queryForLink}`, {
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;

    let queryForLink = queryString.stringify(
      {
        api_key: API_KEY_3,
        language: 'ru-RU',
        ...params,
      },
      { arrayFormat: 'comma' }
    );

    return fetchApi(`${API_URL}${url}?${queryForLink}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  static delete(url, options = {}) {
    const { params = {}, body = {} } = options;

    let queryForLink = queryString.stringify(
      {
        api_key: API_KEY_3,
        language: 'ru-RU',
        ...params,
      },
      { arrayFormat: 'comma' }
    );

    return fetchApi(`${API_URL}${url}?${queryForLink}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}
