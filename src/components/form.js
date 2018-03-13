//contact forms from this tutorial
//http://jamesknelson.com/learn-raw-react-ridiculously-simple-forms/

import React, { Component } from 'react';

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
    event.preventDefault();
    const data = new FormData(event.target);
    var response;
    //var queryData = stringifyFormData(data);
    var queryData = JSON.stringify(
      {
        x: 1111,
        y: 2222,
        email: "someting@somemail",
        rate: 3333,
        isOccupied: 0,
      },
    );

    console.log(queryData);
    console.log(DB_URL);


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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="text" />

        <label htmlFor="address">Enter Address</label>
        <input id="address" name="address" type="text" />

        <label htmlFor="rate">How much will your charge per hour?</label>
        <input id="rate" name="rate" type="text" />

        <button>Send data!</button>
      </form>
    );
  }
};

function stringifyFormData(formData) {
  const data = {};
  for (let key of formData.keys()) {
    data[key] = formData.get(key);
  }
  return JSON.stringify(data, null, 2);
}

export default Form;
