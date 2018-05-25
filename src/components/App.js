//parent component

import React, { Component } from 'react';
import '../style/App.css';

// Google Maps API Wrapper from google-maps-react component
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from '../containers/map_container';
import Form from './form';
import Marker from './markers';
const DB_URL = 'http://localhost:4000/locations'


var debug = 1;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);


    this.state = {
      markers: [
        {name: "My Parking Spot", location: {lat: 49.15, lng: -123.16} },
        {name: "Friends Parking Spot", location: {lat: 49.14, lng: -123.15} }
      ]
    }
  }

  handleState(newData) {
    if (debug) console.log("handleState()");

    this.forceUpdate();
  }

  updateStateFromDB(){
    // load initial state from db
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

    const pos = {lat: 49.139259, lng: -123.149641}
    const pos2 = {lat: 49.140, lng: -123.149641}

    console.log(this.state.markers);

    return (
      <div className="App">
        <h1> holy moly finally </h1>
        <Form handleState={this.handleState} />
        <MapContainer google={this.props.google}>
          <Marker />
          <Marker position={pos} />
          <Marker />
          <Marker position={pos2} />
        </MapContainer>
      </div>
    );
  }
}

//console.log(GoogleApiWrapper);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCV1LnHwZpz212WptE71SSlykHW1Sm3ksM',
})(App)
