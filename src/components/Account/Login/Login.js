import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom'
import './Login.css';

async function loginUser(creds) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  }).then(data => data.json())
}

class Login extends React.Component {
  state = {
    username: null,
    password: null,
    redirect: null
  }
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      redirect: null
    };
  }

  async handleSubmit(e) {
    e.preventDefault()
    let username = this.state.username
    let password = this.state.password
    const token = await loginUser({
      username, password
    })
    if (token) {
      this.setState({ redirect: "/form" })
    }
    this.props.setToken(token)
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
            <hr/>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user"></i></span>
                  </div>
                  <input className="form-control" placeholder="login" type="text" onChange={e => this.setState({username: e.target.value})}/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock"></i></span>
                  </div>
                  <input className="form-control" placeholder="password" type="password" onChange={e => this.setState({password: e.target.value})}/>
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </div>
            </form>
            <Link to="/register">Need to register an account? Sign up here</Link>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login