import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      locations: [
        {name: "location 1", location: {lat: 49.131409, lng: -123.154652}}
      ]
    }
  }

  componentDidMount(){
    // check browser's current location
    if (this.props.useCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          console.log(coords);
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
    //if previous is not the same as current reload map
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const google = this.props;
    const {lat, lng} = this.state.currentLocation;

    if (this.map) {
      this.map.panTo({lat, lng})
    }
  }


  loadMap() {
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


      // set up events

      // list of events to setup
      const eventNames = ['click', 'dragend', 'ready'];


      eventNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');


      //add markers to map

      this.state.locations.forEach( location => {
        const marker = new google.maps.Marker({
          position: {lat: location.location.lat, lng: location.location.lng},
          map: this.map,
          title: location.name
        });
      })

    }
  }


  // event handler function
  handleEvent(eventNames) {
    let timeout;
    const handlerName = `on${camelize(eventNames)}`;

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
