import React, { Component } from "react";
import axios from 'axios';

var icons = {
  "Clear": "https://image.flaticon.com/icons/svg/53/53565.svg",
  "Partly Cloudy": "https://d30y9cdsu7xlg0.cloudfront.net/png/17769-200.png",
  "Rain": "https://image.flaticon.com/icons/svg/54/54456.svg",
  "Light Rain": "https://maxcdn.icons8.com/Share/icon/Weather//light_rain_21600.png",
  "Mostly Cloudy": "https://image.flaticon.com/icons/svg/53/53934.svg",
  "Overcast": "https://maxcdn.icons8.com/Share/icon/Weather//clouds1600.png",
  "Scattered Clouds": "https://image.flaticon.com/icons/svg/53/53934.svg",
  "Chance of Rain": "https://www.mikeafford.com/store/store-images/ms01b_example_heavy_rain_showers.png",
  "Light Snow": "https://cdn4.iconfinder.com/data/icons/weathercons/64/snow-512.png",
  "Snow": "https://i.imgur.com/RAVaruD.png",
  "Snow Showers": "https://i.imgur.com/RAVaruD.png",
  "Ice Pellets": "https://d30y9cdsu7xlg0.cloudfront.net/png/9799-200.png"
}

export default class ForecastsBox extends Component {

  constructor(props) {
    super(props)

    this.state = {
      day: ["Mon", "Tues", "Wed"],
      hi: [45,23,24],
      low: [12,32,12],
      conditions: ["Ice Pellets", "Clear", "Overcast"]
    }
  }

  getForecast() {
    const that = this;
    setTimeout(function() {
      const API_KEY = "e9f795d54303e612";
      const lat = that.props.lat;
      const lon = that.props.lon;
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
          that.setState({ day, hi:high, low, conditions });
      })
    }, 600)
}


  componentDidMount() {
    this.getForecast();
  }

  componentWillReceiveProps() {
    this.getForecast();
  }

  render() {
    const lowStyle = {
      margin: 5,
      padding:5,
      fontSize: "25px",
      background:"blue",
      fontWeight:"bold",
      boxShadow:"-1px 3px 2px black"
    }

    const highStyle = {
      margin: 5,
      fontSize: 25,
      padding:5,
      background:"red",
      fontWeight:"bold",
      boxShadow: "-1px 3px 2px black"
    }
    return (
      <div className="row" style={{marginBottom:70}}>
        <div className="col-md-4 forecast-1">
          <h1 className="">{this.state.day[0]}</h1>
          <span style={highStyle}>{this.state.hi[0]}</span>
          <span style={lowStyle}>{this.state.low[0]}</span>
          <h3>{this.state.conditions[0]}</h3>
          <img role="presentation" src={icons[this.state.conditions[0]]} className="icon" />
        </div>
        <div className="col-md-4 forecast-1">
          <h1>{this.state.day[1]}</h1>
          <span style={highStyle}>{this.state.hi[1]}</span>
          <span style={lowStyle}>{this.state.low[1]}</span>
          <h3>{this.state.conditions[1]}</h3>
          <img role="presentation" src={icons[this.state.conditions[1]]} className="icon" />
        </div>
        <div className="col-md-4 forecast-1">
          <h1>{this.state.day[2]}</h1>
          <span style={highStyle}>{this.state.hi[2]}</span>
          <span style={lowStyle}>{this.state.low[2]}</span>
          <h3>{this.state.conditions[2]}</h3>
          <img role="presentation" src={icons[this.state.conditions[2]]} className="icon" />
        </div>
      </div>
    )
  }
}
