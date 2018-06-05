//parent component

import React, { Component } from 'react';
import '../style/App.css';

// Google Maps API Wrapper from google-maps-react component
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from '../containers/map_container';
import Form from './form';
import Markers from './markers';
const DB_URL = 'http://localhost:4000/locations'


var debug = 1;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleStateFormLatLng = this.handleStateFormLatLng.bind(this);
    this.updateStateFromDB = this.updateStateFromDB.bind(this);

    this.state = {
      formLatLng: {"lat": 0, "lng": 0}, //this is for the latlnt in form field
      userData: [
        {
          //"_id": "",
          //"isOccupied": false,
          //"rate": 0,
          //"email": "",
          //"lng": 0,
          //"lat": 0,
          //"__v": 0
        }
      ]
    }
  }

  componentDidMount() {
    this.updateStateFromDB();
    //console.log("userData");
    //console.log(this.state.userData);
  }

  handleStateFormLatLng(data) {
    this.setState({formLatLng: data});
    console.log(this.state.formLatLng);
  }

  updateStateFromDB(){
    fetch(DB_URL)
      .then(response => {
        response = response.json()
          .then(data => {
            this.setState({userData : data});
          })
      });
  }

  render() {
    if(debug) console.log("app render()");

    return (
      <div className="App">
        <h1> Parking Space Share </h1>
        <Form
          handleState={this.updateStateFromDB}
          formLatLng={this.state.formLatLng}
         />
        <MapContainer
          google={this.props.google}
          formLatLng={this.handleStateFormLatLng}>
          <Markers />
          <Markers position={this.state.userData} />
        </MapContainer>
      </div>
    );
  }
}

//console.log(GoogleApiWrapper);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCV1LnHwZpz212WptE71SSlykHW1Sm3ksM',
})(App)
