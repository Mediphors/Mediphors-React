import React from 'react'
import axios from 'axios'
import "./MediphorList.css"
import Mediphor from './Mediphor'

var url = process.env.REACT_APP_API_URL

class MediphorList extends React.Component {
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
            baseURL: url,
          });
          let response = await instance.get('/mediphors')
          this.setState({mediphors: response.data})
    }

    async deleteMediphor(imageURL) {
        let data = {
            imageURL: imageURL
          }
          console.log(data)
          return fetch(url + '/mediphors/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => data.json())
          .then(response => {
              //console.log('Success:', JSON.stringify(response))
              this.getMediphors()
            })
          .catch(error => console.error('Error:', error));
    }

    render() {
        if (this.state.mediphors) {
            return (
                <div className="container-fluid">
                    <div className="row display-flex no-gutters">
                        <div className="card-group">
                        {this.state.mediphors.map((mediphor, i) => (
                            <Mediphor mediphor={mediphor} key={i} delete={this.deleteMediphor} loggedIn={this.props.loggedIn}/>
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

export default MediphorList