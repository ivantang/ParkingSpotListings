//parent component

import React, { Component } from 'react';
import '../style/App.css';

// Google Maps API Wrapper from google-maps-react component
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from '../containers/map_container';
import Form from './form';


class App extends Component {
  constructor(props) {
    super(props);

    debugger;

    this.markerHandler = this.markerHandler.bind(this);

    this.state = {
      userData: [
        {
          //"_id": "",
          //"isOccupied": false,
          //"rate": 0,
          //"email": "",
          //"y": 0,
          //"x": 0,
          //"__v": 0
        }
      ]
    }
  }

  markerHandler(data) {
      this.setState({
        userData: data
    });
  }

  render: function() {
    if ()
    return (
      <div className="App">
        <h1> holy moly finally </h1>
        <Form storeUserData={this.markerHandler}/>
        <MapContainer
          google={this.props.google}
          userData={this.state.userData}
        />
      </div>
    );
  }
}

//console.log(GoogleApiWrapper);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCV1LnHwZpz212WptE71SSlykHW1Sm3ksM',
})(App)
