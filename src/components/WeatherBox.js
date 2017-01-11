import React from "react";
import axios from 'axios';

import WeatherInput from "./WeatherInput";
import ForecastsBox from "./ForecastsBox";

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
  "Ice Pellets": "https://d30y9cdsu7xlg0.cloudfront.net/png/9799-200.png"
}

const cities = {
  "Current Location": {"lat": null, "lon": null},
  "Anchorage": {"lat": 61.2181, "lon": -149.9003},
  "Boston": {"lat": 42.361145, "lon": -71.057083},
  "Chicago": {"lat": 41.8781, "lon": -87.6298},
  "New York": {"lat": 40.785091, "lon":  -73.968285},
  "Saint Louis": {"lat": 38.6270, "lon": -90.1994},
  "San Francisco": {"lat": 37.7749, "lon": -122.4194},
  "Dallas": {"lat": 32.7766642, "lon": -96.7969879},
  "Honolulu": {"lat": 21.3069, "lon": -157.8583},
  "Miami": {"lat": 25.7617, "lon": -80.1918},
  "Phoenix": {"lat": 33.4484, "lon": -112.0740},
  "New Orleans": {"lat": 29.9511, "lon": -90.0715}
}

let initial_lat = null;
let initial_lon = null;

export default class WeatherBox extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			lat: "",
			lon: "",
			temp: "",
			location: "",
			weather: "",
			forecast: []
		}
	}

	getCoordinates() {
		const that = this;
		navigator.geolocation.getCurrentPosition(function(position) {
      initial_lat = position.coords.latitude;
      initial_lon = position.coords.longitude;
			that.setState({
				lat: position.coords.latitude,
				lon: position.coords.longitude
			})
		});
	}

	getConditions(){
		const that = this;
		setTimeout(function() {
			const API_KEY = "e9f795d54303e612";
			const lat = that.state.lat;
			const lon = that.state.lon;
			const url = `https://api.wunderground.com/api/${API_KEY}/conditions/q/${lat},${lon}.json`;
			axios.get(url)
				.then(function(response) {
					const data = response.data.current_observation;
					const temp = data.temp_f;
					const weather = data.weather;
					const location = data.display_location.full;
					that.setState({
						temp,
						weather,
						location
					})

				})
				.catch(function(err) {
					console.log(url)
				})
		}, 500)
	}

	componentWillMount() {
		this.getCoordinates();
		this.getConditions();
		// this.getForecast();
	}

	handleSelectChange() {
    const lat = this.state.lat;
    const lon = this.state.lon;
    var select = document.querySelector("select").value;
    if(select === "Current Location") {
      this.setState({
        lat:initial_lat,
        lon:initial_lon
      })
      this.getConditions();
    } else {
      this.setState({
        lat: cities[select].lat,
        lon: cities[select].lon
      })
      this.getConditions();
    }
	}

	render(){

		return (

			<seciton>
				{/*this will be the weather box*/}

				<div className="banner">
          <div className="weather-banner-box">
            <h2>{this.state.location}</h2>
            <h2>{this.state.temp}F</h2>
            <img role="presentation" src={icons[this.state.weather]} className="icon" />
            <h2>{this.state.weather}</h2>
          </div>

				</div>

				<div className="container text-center">
						<h1>{this.state.zipcode}</h1>
						<WeatherInput
							lat={this.state.lat}
              onChange={this.handleSelectChange.bind(this)}
							lon={this.state.lon}/>
						<ForecastsBox
							lat={this.state.lat}
							lon={this.state.lon}
							temp={this.state.temp}
							weather={this.state.weather}/>
				</div>

			</seciton>
		)
	}
}
