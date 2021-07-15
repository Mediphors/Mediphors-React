import React from 'react'
import axios from 'axios'
import "./Mediphors.css"
import Mediphor from './Mediphor'

class Mediphors extends React.Component {
    constructor(props) {
        super(props);
        this.getMediphors = this.getMediphors.bind(this)
        this.deleteMediphor = this.deleteMediphor.bind(this)
    }

    state = {
        mediphors: [],
    }

    componentDidMount() {
        this.getMediphors()
    }

    async getMediphors() {
        const instance = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            }
          });
          let response = await instance.get('/mediphors')
          this.setState({mediphors: response.data})
    }

    async deleteMediphor(imageURL) {
        let data = {
            imageURL: imageURL
          }
          console.log(data)
          return fetch('http://localhost:8080/mediphors/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => data.json())
          .then(response => {console.log('Success:', JSON.stringify(response)); this.getMediphors()})
          .catch(error => console.error('Error:', error));
    }

    render() {
        if (this.state.mediphors) {
            return (
                <div className="container-fluid">
                    <div className="row display-flex no-gutters">
                        <div className="card-group">
                        {this.state.mediphors.map((mediphor, i) => (
                            <Mediphor mediphor={mediphor} key={i} delete={this.deleteMediphor}/>
                        ))}
                        </div>
                    </div>
                 </div>
            )
        } else {
            return (<div>No Mediphors</div>)
        }
    }
}

export default Mediphors