import React from 'react'
import { IKImage, IKContext } from 'imagekitio-react'
import './Mediphor.css';

var url = process.env.REACT_APP_API_URL

class Mediphor extends React.Component {
    constructor(props) {
        super(props);
        this.updateMediphor = this.updateMediphor.bind(this)
        this.getMediphor = this.getMediphor.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
        //console.log(props)
    }

    state = {
        description: this.props.mediphor.description,
        hashtags: this.props.mediphor.hashtags,
        imageURL: this.props.mediphor.imageURL,
        language: ""
    }

    componentDidMount() {
        this.getMediphor()
    }

    async updateMediphor() {
        let data = {
            id: this.props.mediphor._id,
            description: this.state.description,
            hashtags: this.state.hashtags,
            imageURL: this.state.imageURL,
            language: this.state.language,
          }
          let urlParm = '/mediphors/update'
          return fetch(url + urlParm, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => data.json())
          .then(response => {
              //console.log('Success:', JSON.stringify(response))
              this.getMediphor()
          })
          .catch(error => console.error('Error:', error));
    }

    async getMediphor() {
        let data = {
            imageURL: this.props.mediphor.imageURL
          }
          return fetch(url + '/mediphors/mediphor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => data.json())
          .then(response => {this.setState({description: response[0].description, hashtags: response[0].hashtags, imageURL: response[0].imageURL,}); console.log(this.state)})
          .catch(err => console.error('Error: ', err))
    }

    changeLanguage = (e) => {
        if (e.target.value != "en")
        this.setState({language: e.target.value})
    }

    delete = (imageURL) => {
        if (window.confirm("Are you sure you want to delete this mediphor?")) {
            console.log(imageURL)
            this.props.delete(imageURL)
        }
    }


    render() {
        return (
            <div className="Container">
                <div className="Row">
                    <div className="card bg-light h-100">
                        <IKContext urlEndpoint="https://ik.imagekit.io/mediphors/">
                            <IKImage
                                path={this.props.mediphor.imageURL.split('/').pop()}
                                transformation={[{
                                "height": "500",
                                "width": "500"
                                }]}
                            />
                        </IKContext>
                        <div className="card-body">
                            <div className="row no-gutters">
                                <div className="card-subtitle text-muted small col-9">
                                    {this.state.hashtags.map((hashtag, i) => (
                                        <div className="d-inline" key={i}>{hashtag} </div>
                                    ))}
                                </div>
                                <div className="col-1">
                                    <select class="form-select form-select-lg mb-3" aria-label="language select">
                                        <option selected>Select a Language</option>
                                        <option value="en">English</option>
                                        <option value="es">española</option>
                                        <option value="de">Deutsche</option>
                                        <option value="fr">française</option>
                                    </select>
                                </div>
                                <div className="col-2">
                                    <a href="#editModal" data-target={"#editModal"+this.props.mediphor.imageURL} data-toggle="modal"><i className="fas fa-edit p-2"></i></a>
                                    <div className="modal fade" id={"editModal"+this.props.mediphor.imageURL} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Edit Mediphor</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="form-group form-group-lg">
                                                    <div className="row p-2">
                                                        <label className="col-3 col-form-label">Language</label>
                                                        <select className="col-3" value={this.state.language} onChange={this.changeLanguage}>
                                                            <option value="">English</option>
                                                            <option value="es">Spanish</option>
                                                            <option value="fr">French</option>
                                                            <option value="de">German</option>
                                                        </select>
                                                    </div>
                                                    <div className="row p-2">
                                                        <label className="col-3 col-form-label">Description</label>
                                                        <textarea className="col-8 form-control" rows="4" name="name" value={this.state.description} onChange={e => this.setState({description: e.target.value})}/>
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
                            <p className="card-text mx-auto line-clamp">{this.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mediphor