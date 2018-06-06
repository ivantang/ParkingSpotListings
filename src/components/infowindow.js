import ReactDomServer from 'react-dom/server';
import React, { Component } from 'react';

var debug = 0;

export default class InfoWindow extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidUpdate(prevProps) {

    if (this.props.map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (this.props.marker !== prevProps.marker && this.props.userInformation != null) {
      this.updateContent();
    }

    if ((this.props.visible !== prevProps.visible) ||
        (this.props.marker !== prevProps.marker)) {
      this.props.visible ?
        this.openWindow() :
        this.closeWindow();
    }

    if(document.getElementById("purchase"))
    document.getElementById("purchase").onclick = function() {purchaseSpot()};

    var purchaseSpot = () => {
      console.log(this);

      return 0;
    };


  }

  componentWillReceiveProps() {

    if(debug) console.log(this.props);
  }

  openWindow() {
    this.infowindow.open(this.props.map, this.props.marker);
  }
  closeWindow() {
    this.infowindow.close();
  }

  updateContent() {
    this.infowindow.setContent( '<p>Lat: ' + this.props.userInformation.lat + '</p>' +
                                '<p>Long: ' + this.props.userInformation.lng + '</p>' +
                                '<p>rate: $' + this.props.userInformation.rate + '/day</p>' +
                                //'<button onClick="handleButton()">Purchase</button>');
                                '<button id="purchase"> Purchase </button>'
                              );

  }

  renderInfoWindow() {
    let {map, google, mapCenter} = this.props;

    const iw = this.infowindow = new google.maps.InfoWindow({
      content: 'hi'
    });
  }

  render() {
    return null;
  }

}
