import React, { Component } from 'react';

export default class Marker extends React.Component {

  //markers updated when position or map is changed
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate()');
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      this.componentWillReceiveProps();
    }
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps()');
    if(this.props.map === undefined || this.props.google === undefined || this.props.position === undefined ) {
      console.log("something is null");
      return null;
    }
    this.renderMarker();
  }

  renderMarker() {

    let map = this.props.map;
    let google = this.props.google;
    let position = this.props.position;

    let pos = position;

    position = new google.maps.LatLng(pos.lat, pos.lng);

    var MarkerTitle = pos.lat.toString() + pos.lng.toString();

    const pref = {
      map: map,
      position: position,
      title: MarkerTitle
      //icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/102549-200.png'
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

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}
