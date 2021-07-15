import React from 'react' 
import {Link, Redirect} from 'react-router-dom'

import './Register.css';

async function registerUser(creds) {
    return fetch('http://localhost:8080/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
    }).then(data => data.json())
    .then(response => console.log('Success: ', JSON.stringify(response)))
    .catch(error => console.error('Error: ', error));
  }

class Register extends React.Component {
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
        registerUser({username, password})
        this.setState({ redirect: "/login" })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center mb-4 mt-1">Register Account</h4>
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
                                <button type="submit" className="btn btn-primary btn-block">Signup</button>
                            </div>
                        </form>
                        <Link to="/login">Need to login to an account? Login here</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register