import React, { Component } from "react";
import axios from 'axios';

export default class ForecastsBox extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      day: [],
      hi: [],
      low: [],
      conditions: []
    }
  }

  getForecast() {
    const that = this;
    setTimeout(function() {
      const API_KEY = "e9f795d54303e612";
      const lat = that.props.lat;
      const lon = that.props.lon;
      let forecast1 = [];
      const url = `https://api.wunderground.com/api/${API_KEY}/forecast10day/q/${lat},${lon}.json`;
      axios.get(url)
        .then(function(response) {
          const data = response.data.forecast.simpleforecast.forecastday;
          let day = [];
          let high = [];
          let low = [];
          let conditions = [];
          for (let i = 1; i < data.length; i++) {
            day.push(data[i].date.weekday_short);
            high.push(data[i].high.fahrenheit);
            low.push(data[i].low.fahrenheit);
            conditions.push(data[i].conditions);
          }
          console.log(day, high, low, conditions);
          that.setState({ day, hi:high, low, conditions });
      })
    }, 600)
}


  componentDidMount() {
    this.getForecast();
  }

  render() {
    return (
      <div className="row" style={{marginBottom:70}}>
        <div className="col-sm-4 forecast-1">
          <h2 className="">{this.state.day[0]}</h2>
          <h2>{this.state.hi[0]} Hi</h2>
          <h2>{this.state.low[0]} Lo</h2>
          <h3>{this.state.conditions[0]}</h3>
          <img role="presentation" src={icons[this.state.conditions[0]]} className="icon" />
        </div>
        <div className="col-sm-4 forecast-1">
          <h2>{this.state.day[1]}</h2>
          <h2>{this.state.hi[1]} Hi</h2>
          <h2>{this.state.low[1]} Lo</h2>
          <h3>{this.state.conditions[1]}</h3>
          <img role="presentation" src={icons[this.state.conditions[1]]} className="icon" />
        </div>
        <div className="col-sm-4 forecast-1">
          <h2>{this.state.day[2]}</h2>
          <h2>{this.state.hi[2]} Hi</h2>
          <h2>{this.state.low[2]} Lo</h2>
          <h3>{this.state.conditions[2]}</h3>
          <img role="presentation" src={icons[this.state.conditions[2]]} className="icon" />
        </div>
      </div>
    )
  }
}

var icons = {
  "Clear": "https://cdn1.iconfinder.com/data/icons/linear-weather-icons/100/meteo_sunny-512.png",
  "Partly Cloudy": "http://downloadicons.net/sites/default/files/partly-cloudy-day-icon-61624.png",
  "Rain": "http://www.iconsfind.com/wp-content/uploads/2016/07/20160725_5795bcd95bf60.png",
  "Mostly Cloudy": "http://image.flaticon.com/icons/svg/53/53934.svg",
  "Overcast": "http://image.flaticon.com/icons/svg/53/53934.svg",
  "Scattered Clouds": "http://image.flaticon.com/icons/svg/53/53934.svg",
  "Chance of Rain": "http://www.mikeafford.com/store/store-images/ms01b_example_heavy_rain_showers.png",
  "Light Snow": "https://cdn4.iconfinder.com/data/icons/weathercons/64/snow-512.png",
  "Snow": "http://i.imgur.com/RAVaruD.png",
  "Ice Pellets": "https://d30y9cdsu7xlg0.cloudfront.net/png/9799-200.png"
}
