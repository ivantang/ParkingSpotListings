//component that renders the map objects

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/form';

var debug = 0;

export default class MapContainer extends Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }

  componentDidMount() {
    if(debug) console.log("componentDidMount()");

    // check browser's current location
    if (this.props.useCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          if(debug) console.log("current location =" + coords.latitude + coords.longitude);
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

      if(debug) console.log(lat + " " + lng);

      const mapConfig = Object.assign({}, {
        center: {
          lat: lat,
          lng: lng},
        zoom: this.props.zoom,
      })
      this.map = new maps.Map(node, mapConfig);

      // set up events
      // list of events to setup
      const eventNames = ['click', 'dragend', 'ready'];

      eventNames.forEach(iterator => {
        this.map.addListener(iterator, this.handleEvent(iterator));
      });

      maps.event.trigger(this.map, 'ready');

      this.forceUpdate();
    }
  }

  // event handler function
  handleEvent(eventName) {
    return (event) => {
      //console.log(eventName);
      //console.log(event);

      if (eventName === 'click') {
        let data = {"lat": event.latLng.lat(), "lng":event.latLng.lng()}
        //console.log(data);
        this.props.hideInfoWindow(data);

        this.props.formLatLng(data);
      }

    }
  }

  renderChildren() {
    const {children} = this.props;

    //if no children dont do anything
    if(!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    })
  }

  render() {
    if(debug) console.log("map_container render()");

    const style = {
      position: 'absolute',
      width: '100%',
      height: '100%'
    }

    return (
      <div ref='map' style={style}>
        loading map...
        {this.renderChildren()}
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
