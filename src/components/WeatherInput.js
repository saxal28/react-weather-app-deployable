import React, { Component } from 'react';

export default class WeatherInput extends Component{
  render() {
    const lat = this.props.lat ? this.props.lat : "...";
    const lon = this.props.lon ? this.props.lon : "...";
    return (
      <section>
        <select className="weather-select">
          <option>Current Location</option>
          <option>Boston</option>
          <option>New York</option>
        </select>
      </section>
    )
  }
}

const cities = {
  "Current Location": {"lat": 15, "lon": -50},
  "Boston": {"lat": 42.361145, "lon": -71.057083},
  "New York": {"lat": 40.785091, "lon":  -73.968285}
}
