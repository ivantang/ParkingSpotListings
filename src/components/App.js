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

    this.handleState = this.handleState.bind(this);
    this.updateStateFromDB = this.updateStateFromDB.bind(this);

    this.state = {
      markers: [
        {email: "My Parking Spot", location: {lat: 49.15, lng: -123.16} },
        {email: "Friends Parking Spot", location: {lat: 49.14, lng: -123.15} }
      ],
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

  handleState(data) {
    if (debug) console.log("handleState()");
    data.lat = parseFloat(data.lat);
    data.lng = parseFloat(data.lng)

    this.state.userData.push(data);

    this.setState({userData: data});
    console.log(this.state);
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
        <h1> holy moly finally </h1>
        <Form handleState={this.updateStateFromDB} />
        <MapContainer google={this.props.google}>
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
