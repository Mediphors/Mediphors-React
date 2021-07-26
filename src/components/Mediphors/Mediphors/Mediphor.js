import React from 'react'
import { useLocation } from "react-router-dom";
import { IKImage, IKContext } from 'imagekitio-react'
import './Mediphor.css';

var url = process.env.REACT_APP_API_URL
var { description, imageURL, language, _id } = ""
var { hashtags } = []

async function getMediphor() {
    let data = {
        imageURL:  imageURL
    }
    return fetch(url + '/mediphors/mediphor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())
    .then(response => { 
            description = response[0].description
            hashtags = response[0].hashtags
            imageURL = response[0].imageURL
        })
        .catch(err => console.error('Error: ', err))
}

function changeLanguage(e) {
    if (e.target.value !== "en")
        language= e.target.value
}

async function remove(imageURL) {
    if (window.confirm("Are you sure you want to delete this mediphor?")) {
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
        })
        .then(data => data.json())
        .then(response => {
            //console.log('Success:', JSON.stringify(response))
            this.getMediphors()
        })
        .catch(error => console.error('Error:', error));
    }
}

async function updateMediphor() {
    let data = {
        id: _id,
        description:  description,
        hashtags:  hashtags,
        imageURL:  imageURL,
        language:  language,
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
           getMediphor()
      })
      .catch(error => console.error('Error:', error));
}

function Mediphor() {
    const location = useLocation()

    const { loc_description, loc_hashtags, loc_imageURL, loc_language, loc_id } = location.state;
    description = loc_description
    hashtags = loc_hashtags
    imageURL = loc_imageURL
    language = loc_language
    _id = loc_id

    console.log(description, hashtags, imageURL, language, _id)
    console.log(location.state)

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <IKContext urlEndpoint="https://ik.imagekit.io/mediphors/">
                        <IKImage
                            path={imageURL.split('/').pop()}
                            transformation={[{
                            "height": "500",
                            "width": "500"
                            }]}
                        />
                    </IKContext>
                </div>
                <div className="col card bg-light h-100 ">
                    <div className="card-body">
                        <div className="row no-gutters">
                            <div className="card-subtitle text-muted small col-9">
                                {hashtags.map((hashtag, i) => (
                                    <div className="d-inline" key={i}>{hashtag} </div>
                                ))}
                            </div>
                            
                            <div className="col-3">
                                <div className="row">
                                    <div className="">
                                        <select class="form-select form-select-lg mb-3" aria-label="language select">
                                            <option selected>Select a Language</option>
                                            <option value="en">English</option>
                                            <option value="es">española</option>
                                            <option value="de">Deutsche</option>
                                            <option value="fr">française</option>
                                        </select>
                                    </div>
                                </div>
                                <a href="#editModal" data-target={"#editModal"+ imageURL} data-toggle="modal"><i className="fas fa-edit p-2"></i></a>
                                <div className="modal fade" id={"editModal"+ imageURL} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                    <select className="col-3" value={language} onChange={ changeLanguage}>
                                                        <option value="">English</option>
                                                        <option value="es">Spanish</option>
                                                        <option value="fr">French</option>
                                                        <option value="de">German</option>
                                                    </select>
                                                </div>
                                                <div className="row p-2">
                                                    <label className="col-3 col-form-label">Description</label>
                                                    <textarea className="col-8 form-control" rows="4" name="name" value={description} onChange={e =>  description= e.target.value}/>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={updateMediphor} data-dismiss="modal">Save Changes</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={getMediphor}>Discard Changes</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <a type='button' href='/' onClick={() => remove(imageURL)}><i className="fas fa-trash"></i></a>
                            </div>
                        </div>
                        <p className="card-text mx-auto line-clamp">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Mediphor