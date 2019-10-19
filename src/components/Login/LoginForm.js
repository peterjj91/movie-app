import React from 'react';
import PropTypes from 'prop-types';
import Field from './../Field';
import { API_URL, API_KEY_3, fetchApi } from './../../api/api';

export default class LoginForm extends React.Component {
  state = {
    values: {
      username: '',
      password: '',
      repeatPassword: '',
      submitting: false,
    },
    errors: {
      username: false,
      password: false,
      repeatPassword: false,
    },
  };

  static propTypes = {
    updateUser: PropTypes.func,
    updateSessionId: PropTypes.func,
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleBlur = () => {
    const errors = this.validateFields();

    if (Object.keys(errors).length > 0) {
      this.setState(() => ({
        errors: errors,
      }));
    } else {
      this.setState(state => ({
        values: {
          ...this.state.values,
          currentStep: state.values.currentStep + 1,
        },
        errors: errors,
      }));
    }
  };

  validateFields = () => {
    const { values } = this.state;
    const errors = {};

    if (values.username.length < 5) {
      errors.username = 'username must be 5 characters or more';
    }
    if (values.password.length < 5) {
      errors.password = 'password must be 5 characters or more';
    }
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'repeat password must be equal password';
    }

    return errors;
  };

  onSubmit = () => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        submitting: true,
      },
    }));
    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.values.username,
              password: this.state.values.password,
              request_token: data.request_token,
            }),
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              request_token: data.request_token,
            }),
          }
        );
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
        );
      })
      .then(user => {
        this.props.updateUser(user);
        this.setState(prevState => ({
          values: {
            ...prevState.values,
            submitting: false,
          },
        }));
      })
      .catch(error => {
        this.setState(prevState => ({
          values: {
            ...prevState.values,
            submitting: false,
          },
          errors: {
            ...prevState.errors,
            base: error.status_message,
          },
        }));
      });
  };

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  render() {
    const { values, errors } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>

          <Field
            labelText="Пользователь"
            type="text"
            id="username"
            name="username"
            placeholder="Пользователь"
            value={values.username}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.username}
          />

          <Field
            labelText="Пароль"
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            value={values.password}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.password}
          />

          <Field
            labelText="Пароль"
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Пароль"
            value={values.repeatPassword}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.repeatPassword}
          />

          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={values.submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
