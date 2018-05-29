import React, { Component } from 'react';

var markerArray = [];

export default class Markers extends React.Component {

  // constructor(props) {
  //   super(props);
  //
  //   this.componentWillUnmount = this.componentWillUnmount.bind(this);
  // }

  //markers updated when position or map is changed
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      this.componentWillReceiveProps();
    }
  }

  componentWillReceiveProps() {
    if(this.props.map === undefined || this.props.google === undefined || this.props.position === undefined ) {
      return null;
    }
    this.renderMarkers();
  }

  renderMarkers() {

    //console.log(this.props);
    this.removeAllMarkers();

    this.props.position.forEach(position => {

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

      markerArray.push(marker);

      //create marker events
      const eventNames = ['click', 'mouseover'];

      eventNames.forEach(iterator => {
        marker.addListener(iterator, this.handleEvent(iterator));
      })

    });

  }

  handleEvent(eventName) {
    return (event) => {
      console.log(eventName);
      console.log(event);
    }
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

Markers.propTypes = {
  position: React.PropTypes.array,
  map: React.PropTypes.object
}
