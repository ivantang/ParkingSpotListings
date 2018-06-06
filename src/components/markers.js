import React, { Component } from 'react';

var markerArray = [];

export default class Markers extends React.Component {

   constructor(props) {
     super(props);
  //
  //   this.componentWillUnmount = this.componentWillUnmount.bind(this);
      this.renderMarkers = this.renderMarkers.bind(this);
   }

  //markers updated when position or map is changed
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
        (this.props.position !== prevProps.position)) {
      this.componentWillReceiveProps();
    }
  }

  componentWillReceiveProps() {
    if(this.props.map === undefined ||
       this.props.google === undefined ||
       this.props.position === undefined) {
      return null;
    }
    this.renderMarkers();
  }

  renderMarkers() {

    //console.log(this.props);
    this.removeAllMarkers();

    this.props.position.forEach(position => {

      let props = this.props;
      let map = this.props.map;
      let google = this.props.google;

      let pos = position;
      let MarkerTitle = position.email;

      position = new google.maps.LatLng(pos.lat, pos.lng);

      const pref = {
        map: map,
        position: position,
        title: MarkerTitle
        //icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/102549-200.png'
      };
      const marker = new google.maps.Marker(pref);

      marker.addListener('click', function() {
        props.onMarkerClick(props, marker, pos)
      });

      markerArray.push(marker);

    });

  }

  //removing the marker
  removeAllMarkers() {
    if (markerArray) {
      markerArray.forEach(marker => {
          marker.setMap(null);
      })
      markerArray.length = 0;
    }
  }

  render() {
    //we dont need to interact with DOM element
    //only need to hand contructed virtual DOM bk to react
    return null;
  }

}

global.purchaseParkingSpot = function purchaseParkingSpot(){
  console.log("Button in info window");
  console.log(this);
  //set entry in db for isOccupied to true
  //rerender markers
}

Markers.propTypes = {
  position: React.PropTypes.array,
  map: React.PropTypes.object
}
