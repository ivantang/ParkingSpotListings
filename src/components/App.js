//parent component

import React, { Component } from 'react';

import styled from 'styled-components';

// Google Maps API Wrapper from google-maps-react component
import { GoogleApiWrapper } from 'google-maps-react';

//local files and components
import MapContainer from '../containers/map_container';
import Form from './form';
import Markers from './markers';
import InfoWindow from './infowindow';
const DB_URL = 'http://localhost:4000/locations'


var debug = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleStateFormLatLng = this.handleStateFormLatLng.bind(this);
    this.updateStateFromDB = this.updateStateFromDB.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.hideInfoWindow = this.hideInfoWindow.bind(this);

    this.state = {
      //form
      formLatLng: {"lat": 0, "lng": 0}, //this is for the latlnt in form field

      //markers
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
      ],

      //infowindow
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  componentDidMount() {
    this.updateStateFromDB();
    //console.log("userData");
    //console.log(this.state.userData);
  }

  handleStateFormLatLng(data) {
    this.setState({formLatLng: data});
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

  onMarkerClick(props, marker, userInformation) {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        userInformation: userInformation,
        showingInfoWindow: true
      });
  }

  hideInfoWindow(data) {
    this.setState({
        showingInfoWindow: false,
        activeMarker: null
    });
  }


  render() {
    if(debug) console.log("app render()");
    console.log(this);
    return (
      <div className="App">
        <SideBar>
          <Title>
            Parking Space Share
          </Title>
          <Form
            handleState={this.updateStateFromDB}
            formLatLng={this.state.formLatLng}
           />
        </SideBar>
        <MapContainer
          google={this.props.google}
          formLatLng={this.handleStateFormLatLng}
          hideInfoWindow={this.hideInfoWindow}>
          <Markers
            position={this.state.userData}
            onMarkerClick={this.onMarkerClick}/>
          <InfoWindow onClick={()=>console.log(this)}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            selectedPlace={this.state.selectedPlace}
            userInformation={this.state.userInformation}
            removeMarker={Markers.removeMarker}>
          </InfoWindow>
        </MapContainer>
      </div>
    );
  }
}

/* STYLING */

const Title = styled.h1`
  text-align: center;
  height: 25px;
`

const SideBar = styled.section`
  background-color: grey;
  color: white;
  height: 100%;
  width: 450px;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 1;
  padding-top: 20px;
`;

//console.log(GoogleApiWrapper);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCV1LnHwZpz212WptE71SSlykHW1Sm3ksM',
})(App)
