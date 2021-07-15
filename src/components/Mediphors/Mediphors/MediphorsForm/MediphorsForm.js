import React from 'react' 
import axios from 'axios';
import './MediphorsForm.css';

var url = process.env.REACT_APP_API_URL

class MediphorsForm extends React.Component {

  state = {
    description: '',
    hashtags:  '',
    uploadURL: ''
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createImage = this.createImage.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.fileInput = React.createRef();
    this.image = ''
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.uploadImage()
  }  

  handleFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
  }

  createImage (file) {
    this.image = new Image()
    let reader = new FileReader()
    reader.onload = (e) => {
      console.log('length: ', e.target.result.includes('data:image/jpeg'))
      if (!e.target.result.includes('data:image/jpeg')) {
        return alert('Wrong file type - JPG only.')
      }
      if (e.target.result.length > 1000000) {
        return alert('Image is loo large.')
      }
      this.image = e.target.result
    }
    console.log("Image created")
    reader.readAsDataURL(file)
  }

  uploadData (e, url) {
    let data = {
      description: this.state.description,
      hashtags: this.state.hashtags,
      imageURL: this.state.uploadURL
    }
    return fetch(url + '/mediphors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(data => data.json())
    .then(response => console.log('Success:', JSON.stringify(response['body'])))
    .catch(error => console.error('Error:', error));
  }

  async uploadImage() {
      console.log('Upload clicked')
      // Get the presigned URL
      const instance = axios.create({
        baseURL: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      });
      let response = await instance.get('/mediphors/upload')
      
      console.log('Response: ', response)
      console.log('Uploading: ', this.image)
      let binary = atob(this.image.split(',')[1])
      let array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      console.log('Uploading to: ', response.data.uploadURL)
      const result = await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: blobData
      })
      console.log('Result: ', result)
      this.setState({uploadURL: response.data.uploadURL.split('?')[0]})
      console.log(this.state.uploadURL)
      this.uploadData()
      return result
    }
    render() {
      return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Create a Mediphor</h4>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    
                                    <span className="input-group-text"><i className="fas fa-bars fa-lg"></i></span>
                                </div>
                                <input className="form-control" placeholder="Description" type="text" name="description" onChange={e => this.setState({description: e.target.value})}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-tags fa-md"></i></span>
                                </div>
                                <input className="form-control" placeholder="Hashtags" type="text" name="hashtags" onChange={e => this.setState({hashtags: e.target.value})}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-image fa-md"></i></span>
                                </div>                                
                                <input className="form-control" type="file" id="image" name="file" onChange={this.handleFileChange} ref={this.fileInput}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.submit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )
    }
  }
export default MediphorsForm