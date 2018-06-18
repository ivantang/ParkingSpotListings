//contact forms from this tutorial
//http://jamesknelson.com/learn-raw-react-ridiculously-simple-forms/

import React, { Component } from 'react';
import MapContainer from '../containers/map_container';

import styled from 'styled-components';

var debug = 0;


// db variables
const DB_URL = 'http://localhost:4000/locations'
let headers = new Headers();
headers.append('Access-Control-Allow-Origin', 'http://localhost:4000');
headers.append('Access-Control-Allow-Credentials', 'true');

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

/*  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };
*/

  handleSubmit(event) {
    if(debug) console.log("handlesubmit()");
    event.preventDefault();
    const data = new FormData(event.target);

    //console.log(data);
    var queryData = stringifyFormData(data);
    console.log("sending object to db" + queryData);

    // posts userData object to db
    fetch(DB_URL, {
      method: 'POST',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: queryData
    })
    .then( () => this.props.handleState() );
      //this.props.handleState(JSON.parse(queryData));

  }

  /* https://developers.google.com/maps/documentation/geocoding/intro
  <label htmlFor="address">Enter Address</label>
  <input id="address" name="address" type="text" />
  */

  render() {
    if(debug) console.log("form render()");

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Fields>
            <div>
              <label htmlFor="email">Enter your email </label>
              <input id="email" name="email" type="text" />
              <span>{"\n"}</span>

            </div>

            {"\n"}

            <div>
              <label htmlFor="rate">How much will your charge per hour?  </label>
              <input id="rate" name="rate" type="text" />
            </div>

            <div>
              <label htmlFor="x">Latitude</label>
              <input id="lat" name="lat" type="number" step="0.0000000000000001" value={this.props.formLatLng.lat}/>
            </div>

            <div>
              <label htmlFor="y">Longtitude</label>
              <input id="lng" name="lng" type="number" step="0.0000000000000001" value={this.props.formLatLng.lng}/>
            </div>

            <button>Send data!</button>
          </Fields>
        </form>
    </div>
    );
  }
};

const Fields = styled.section`
  text-align: center;
`

function stringifyFormData(formData) {
  const data = {};
  for (let key of formData.keys()) {
    data[key] = formData.get(key);
  }
  data.isOccupied = 0;
  return JSON.stringify(data, null, 2);
}

export default Form;
