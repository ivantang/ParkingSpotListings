//parent component

import React, { Component } from 'react';
import '../style/App.css';

// Google Maps API Wrapper from google-maps-react component
import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from '../containers/map_container';
import Form from './form';

var debug = 1;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
  }

  handleState(newData) {
    if (debug) console.log("handleState()");

    this.forceUpdate();
    }

  render() {
    if(debug) console.log("app render()");

    return (
      <div className="App">
        <h1> holy moly finally </h1>
        <Form handleState={this.handleState} />
        <MapContainer google={this.props.google}>
          <Marker />
          <Marker position={pos} />
        </MapContainer>
      </div>
    );
  }
}

//console.log(GoogleApiWrapper);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCV1LnHwZpz212WptE71SSlykHW1Sm3ksM',
})(App)
