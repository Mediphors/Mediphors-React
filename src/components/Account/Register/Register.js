import React from 'react' 
import {Link, Redirect} from 'react-router-dom'
import './Register.css';

var url = process.env.REACT_APP_API_URL

async function registerUser(creds) {
    return fetch(url + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
    }).then(data => data.json())
    .then(response => {
        if (response === 401) {
            console.log("Wrong Key")
            alert("Incorrect Registration Key")
        } else if (response === 409) {
            console.log("User Exists")
            alert("Username already exists try another username or try logging in")
        } else {
            console.log('Success: ', JSON.stringify(response))
            this.setState({ redirect: "/login" })
        }
    })
    .catch(error => {
        console.error('Error: ', error)
        alert("Incorrect Registration Key")
    });
  }

class Register extends React.Component {
    state = {
        username: null,
        password: null,
        key: null,
        redirect: null
    }
      constructor(props) {
        super(props);
        this.state = {
          username: null,
          password: null,
          key: null,
          redirect: null
        };
    }

    async handleSubmit(e) {
        e.preventDefault()
        let username = this.state.username
        let password = this.state.password
        let key = this.state.key
        registerUser({username, password, key})
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
                                        <span className="input-group-text"> <i className="fa fa-user fa-lg"></i></span>
                                    </div>
                                    <input className="form-control" placeholder="login" type="text" onChange={e => this.setState({username: e.target.value})}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-lock fa-lg"/></span>
                                    </div>
                                    <input className="form-control" placeholder="password" type="password" onChange={e => this.setState({password: e.target.value})}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key fa-sm"/></span>
                                    </div>
                                    <input className="form-control" placeholder="Registration Key" type="text" onChange={e => this.setState({key: e.target.value})}/>
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