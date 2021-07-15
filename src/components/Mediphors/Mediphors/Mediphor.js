import React from 'react'

class Mediphor extends React.Component {
    constructor(props) {
        super(props);
        this.updateMediphor = this.updateMediphor.bind(this)
        this.getMediphor = this.getMediphor.bind(this)
    }

    state = {
        description: this.props.mediphor.description,
        hashtags: this.props.mediphor.hashtags,
        imageURL: this.props.mediphor.imageURL,
    }

    async updateMediphor() {
        let data = {
            id: this.props.mediphor._id,
            description: this.state.description,
            hashtags: this.state.hashtags,
            imageURL: this.state.imageURL
          }
          console.log(data)
          return fetch('https://mediphors-node.herokuapp.com/mediphors/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => data.json())
          .then(response => {
              console.log('Success:', JSON.stringify(response))
              this.getMediphor()
          })
          .catch(error => console.error('Error:', error));
    }

    async getMediphor() {
        let data = {
            imageURL: this.props.mediphor.imageURL
          }
          return fetch('https://mediphors-node.herokuapp.com/mediphors/mediphor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => data.json())
          .then(response => {this.setState({description: response[0].description, hashtags: response[0].hashtags, imageURL: response[0].imageURL,}); console.log(this.state)})
          .catch(err => console.error('Error: ', err))
    }

    delete = (imageURL) => {
        if (window.confirm("Do you want to delete this mediphor?")) {
            console.log(imageURL)
            this.props.delete(imageURL)
        }
    }

    render() {
        return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mt-2 mb-2 p-2" >
                <div className="card bg-light">
                    <img src={this.props.mediphor.imageURL} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <div className="row no-gutters">
                            <div className="card-subtitle text-muted small col-10">
                                {this.state.hashtags.map((mediphor, i) => (
                                    <div className="d-inline">{mediphor} </div>
                                ))}
                            </div>
                            <div className="col-2">
                                <a href="#editModal" data-target={"#editModal"+this.props.mediphor._id} data-toggle="modal" className><i className="fas fa-edit p-2"></i></a>
                                <div className="modal fade" id={"editModal"+this.props.mediphor._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Edit Mediphor</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form className="form-group form-group-lg">
                                                <div className="row">
                                                    <label className="col-3 col-form-label">Hashtags</label>
                                                    <input className="col-8 form-control" type="text" name="name" value={this.state.hashtags} onChange={e => this.setState({hashtags: e.target.value})}/>
                                                </div>
                                                <div className="row">
                                                    <label className="col-3 col-form-label">Description</label>
                                                    <input className="col-8 form-control" type="text" name="name" value={this.state.description} onChange={e => this.setState({description: e.target.value})}/>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={this.updateMediphor} data-dismiss="modal">Save Changes</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.getMediphor}>Discard Changes</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <a type='button' href='/' onClick={() => this.delete(this.state.imageURL)}><i className="fas fa-trash"></i></a>
                            </div>
                        </div>
                        <p>{this.state.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mediphor