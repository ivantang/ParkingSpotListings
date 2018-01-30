import React, { Component } from 'react';
import './App.css';

// Google Maps API Wrapper from google-maps-react component
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from './MapContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1> holy moly finally </h1>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

console.log(GoogleApiWrapper);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCV1LnHwZpz212WptE71SSlykHW1Sm3ksM',
})(App)
