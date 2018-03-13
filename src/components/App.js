import React, { Component } from 'react';
import '../style/App.css';

// Google Maps API Wrapper from google-maps-react component
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from '../containers/map_container';
import Form from './form';


class App extends Component {

  render() {
    return (
      <div className="App">
        <h1> holy moly finally </h1>
        <Form />
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

console.log(GoogleApiWrapper);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCV1LnHwZpz212WptE71SSlykHW1Sm3ksM',
})(App)
