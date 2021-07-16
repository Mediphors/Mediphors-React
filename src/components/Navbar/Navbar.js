import React from 'react';
import Brand from './Brand'
import './Navbar.css'

class Navbar extends React.Component {
    render() {
        if (this.props.type === "login") {
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
                    <Brand className="col-2 d-inline"/>
                    <div className="container-fluid col-10">
                      <form className="form-inline my-2 my-lg-0 col-9 container-fluid">
                        <input className="form-control mr-sm-2 col-xl-9 col-lg-8 col-md-8 col-sm-8 search-input" id="searchBar" type="text" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-secondary my-2 my-sm-0 col-xl-1 col-lg-2 col-md-2 col-sm-2" type="submit">Search</button>
                      </form>
                      <button className="navbar-toggler col-1" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse col-1" id="navbarNav">
                        <ul className="navbar-nav col-1">
                          <li className="nav-item">
                            <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span></a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/register">Register</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                </nav>
            )
        } else if (this.props.type === "app") {
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <Brand className="col-3 d-inline"/>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" href="/">Mediphors List<span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/form">Create a Mediphor</a>
                      </li>
                    </ul>
                  </div>
                </nav>
            )
        }
    }
}
export default Navbar