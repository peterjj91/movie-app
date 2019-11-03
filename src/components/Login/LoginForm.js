import React from 'react';
import PropTypes from 'prop-types';
import Field from './../Field';
import CallApi from './../../api/api';
import AppContextHOC from './../HOC/AppContextHOC';

class LoginForm extends React.Component {
  state = {
    values: {
      username: '',
      password: '',
      repeatPassword: '',
    },
    errors: {
      username: false,
      password: false,
      repeatPassword: false,
    },
    submitting: false,
  };

  static propTypes = {
    updateSessionId: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
  };

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleBlur = event => {
    const errors = this.validateFields();
    const { name } = event.target;

    if (errors[name]) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: errors[name],
        },
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
    this.setState({ submitting: true });

    CallApi.get('/authentication/token/new')
      .then(data => {
        return CallApi.post('/authentication/token/validate_with_login', {
          body: {
            username: this.state.values.username,
            password: this.state.values.password,
            request_token: data.request_token,
          },
        });
      })
      .then(data => {
        return CallApi.post('/authentication/session/new', {
          body: {
            request_token: data.request_token,
          },
        });
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return CallApi.get('/account', {
          params: {
            session_id: data.session_id,
          },
        });
      })
      .then(user => {
        this.setState(
          {
            submitting: false,
          },
          () => {
            this.props.updateUser(user);
          }
        );
      })
      .catch(error => {
        this.setState(prevState => ({
          submitting: false,
          errors: {
            ...prevState.errors,
            base: error.status_message,
          },
        }));
      });
  };

  onLogin = event => {
    event.preventDefault();
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
    const { values, errors, submitting } = this.state;
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
            disabled={submitting}
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

export default AppContextHOC(LoginForm);
