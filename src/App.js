import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js'; 
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import './App.css';

const particlesOptions = {
                  particles: {
                    number: {
                      value: 100,
                      density: {
                        enable: true,
                        value_area: 500
                      }
                    }
                }
              }

const app = new Clarifai.App({
 apiKey: '316e3712504142b5a143c6da29461964'
});

class App extends Component {

  constructor () {
  super();
  this.state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signIn',
    isSignedIn: false,
    user : {
      id: '',
      name: '',
      email: '',
      enteries: 0,
      joined: ''
    }
    
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.log(error))
  // }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: 100*face.left_col + '%',
      top: 100*face.top_row + '%',
      right: 100*(1 - face.right_col) + '%',
      bottom: 100*(1 - face.bottom_row) + '%'
    }

  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then( response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},  
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            console.log(count);
              this.setState(Object.assign(this.state.user, { enteries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
    .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
      if (route === 'home') 
     {
      this.setState({isSignedIn: true});
     } else {
      this.setState({isSignedIn: false});
     }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        enteries: data.enteries,
        joined: data.joined
      } 
    })

  }

  
  render() {
    return (
      <div className="App">
        <Particles className="particles"
              params={particlesOptions}
            />
        {
          this.state.route === 'home' ? 
          <div>
              <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
              <Logo /> 
              <Rank name={this.state.user.name} enteries={this.state.user.enteries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onImageSubmit={this.onImageSubmit}/>
              <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl} />
          </div> 
          : 
          ( this.state.route === 'signIn' ? 
            <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            )
          
        }
       
      </div>
    );
  }
}

export default App;
