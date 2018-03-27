//component that renders the map objects

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/form';

var debug = 1;
const DB_URL = 'http://localhost:3000/locations'

export default class MapContainer extends Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      markers: [
        {name: "My Parking Spot", location: {lat: 49.139259, lng: -123.149641} },
        {name: "Friends Parking Spot", location: {lat: 49.14, lng: -123.15} }
      ],
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

  componentDidMount(){
    if(debug) console.log("componentDidMount()");

    // load initial state from db
    fetch(DB_URL)
      .then(response => {
        response = response.json()
          .then(data => {
            this.setState({userData : data});
          })
      });

    // check browser's current location
    if (this.props.useCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          if(debug) console.log("current location =" + coords);
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          })
        })
      }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if(debug) console.log("componentDidUpdate()");

    //if previous is not the same as current reload map
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    if(debug) console.log("recenterMap()");

    const google = this.props;
    const {lat, lng} = this.state.currentLocation;

    //console.log(lat + " " + lng);

    if (this.map) {
      this.map.panTo({lat, lng})
    }
  }


  loadMap() {
    if(debug) console.log("loadMap()");

    //set up map
    if(this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const {lat, lng} = this.state.currentLocation;

      console.log(lat + " " + lng);

      const mapConfig = Object.assign({}, {
        center: {
          lat: lat,
          lng: lng},
        zoom: this.props.zoom,
      })
      this.map = new maps.Map(node, mapConfig);

      //set up markers
      this.state.userData.forEach( userData => {
        const marker = new google.maps.Marker({
          position: {lat: userData.x, lng: userData.y},
          map: this.map,
          title: userData.email
        });
      })

      // set up events
      // list of events to setup
      const eventNames = ['click', 'dragend', 'ready'];

      eventNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');

      this.forceUpdate();
    }
  }


  // event handler function
  handleEvent(eventNames) {
    let timeout;
    const handlerName = `on${camelize(eventNames)}`;

    if (debug) console.log("handleEvent" + handlerName);


    return (e) => {
      // calls too many times so we need a delay
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }
  }

  render() {
    if(debug) console.log("map_container render()");

    const style = {
      width: '100vw',
      height: '75vh'
    }

    return (
      <div ref='map' style={style}>
        loading map...
      </div>
    );
  }

}

MapContainer.defaultProps = {
  zoom: 15,
  initialCenter: {
    lat: 80.133922,
    lng: -123.156502},
  useCurrentLocation: true
}

/*
Map.propTypes = {
  onMove: React.PropType.function() {
    console.log("hi");
  }
}*/

// for handlerNames
const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}
