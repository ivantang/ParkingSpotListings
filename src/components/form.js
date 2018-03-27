//contact forms from this tutorial
//http://jamesknelson.com/learn-raw-react-ridiculously-simple-forms/

import React, { Component } from 'react';
import MapContainer from '../containers/map_container';

var debug = 1;


// db variables
const DB_URL = 'http://localhost:3000/locations'
let headers = new Headers();
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Credentials', 'true');

class Form extends Component {
  constructor(props) {
    super(props);
    //this.handleSubmit = this.handleSubmit.bind(this);
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
          <label htmlFor="email">Enter your email</label>
          <input id="email" name="email" type="text" />

          <label htmlFor="x">Enter x</label>
          <input id="x" name="x" type="text" />

          <label htmlFor="y">Enter y</label>
          <input id="y" name="y" type="text" />

          <label htmlFor="rate">How much will your charge per hour?</label>
          <input id="rate" name="rate" type="text" />

          <button>Send data!</button>
        </form>
    </div>
    );
  }
};

function stringifyFormData(formData) {
  const data = {};
  for (let key of formData.keys()) {
    data[key] = formData.get(key);
  }
  data.isOccupied = 0;
  return JSON.stringify(data, null, 2);
}

export default Form;
