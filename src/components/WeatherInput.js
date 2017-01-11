import React, { Component } from 'react';

export default class WeatherInput extends Component{
  render() {
    return (
      <section>
        <select className="weather-select" onChange={this.props.onChange}>
          <option>Current Location</option>
          <option>Anchorage</option>
          <option>Boston</option>
          <option>Chicago</option>
          <option>Dallas</option>
          <option>Honolulu</option>
          <option>Miami</option>
          <option>New York</option>
          <option>New Orleans</option>
          <option>Phoenix</option>
          <option>Saint Louis</option>
          <option>San Francisco</option>
        </select>
      </section>
    )
  }
}
