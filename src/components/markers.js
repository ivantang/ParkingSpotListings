import React, { Component } from 'react';

export default class Marker extends React.Component {

  //markers updated when position or map is changed
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      this.renderMarker();
    }
  }

  renderMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
      map: map,
      position: position
    };
    this.marker = new google.maps.Marker(pref);

    //create marker events
    const eventNames = ['click', 'mouseover'];

    eventNames.forEach(iterator => {
      this.marker.addListener(iterator, this.handleEvent(iterator));
    })
  }

  handleEvent(eventName) {
    return (event) => {
      console.log(eventName);
    }
  }


  //removing the marker
  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  render() {
    //we dont need to interact with DOM element
    //only need to hand contructed virtual DOM bk to react
    return null;
  }

}
