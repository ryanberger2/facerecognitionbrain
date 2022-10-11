import React from 'react'; 
import ParticlesBg from 'particles-bg'; 
import Clarifai from 'clarifai'; 
import FaceRecognition from './components/facerecognition/FaceRecognition'; 
import Navigation from './components/navigation/Navigation'; 
// import Signin from './components/signin/Signin'; 
// import Register from '.components/register/Register'; 
import Logo from './components/logo/Logo'; 
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'a42b8701da574476aafdc4ce3d260fd4'
});


class App extends React.Component {
  constructor () {
    super(); 
    this.state = {
      input: '', 
      imageUrl: ''
    }
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});  
  }

  onButtonSubmit = () => {
    console.log('hi'); 
    this.setState({imageUrl: this.state.input}); 
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box); 
      }, 
      function (err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ParticlesBg type="cobweb" color="#ffffff" bg={true} />
        <Rank /> 
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
