import React from "react";
import axios from 'axios';

import WeatherInput from "./WeatherInput";
import ForecastsBox from "./ForecastsBox";

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
  	console.log(position.coords.latitude, position.coords.longitude);
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
					console.log(data)
					that.setState({
						temp,
						weather,
						location
					})

				})
				.catch(function(err) {
					console.log(url)
				})
		}, 600)
	}



	componentWillMount() {
		this.getCoordinates();
		this.getConditions();
		// this.getForecast();
	}

	getZipcode(e) {
		this.setState({zipcode:e.target.value})
	}

	handleInputChange(e) {
		this.getZipcode(e);
	}

	render(){
		return (
			<seciton>
				{/*this will be the weather box*/}

				<div className="banner">
					<h2>{this.state.location}</h2>
					<h2>{this.state.temp}F</h2>
					<img role="presentation" src={icons[this.state.weather]} className="icon" />
					<h2>{this.state.weather}</h2>
				</div>

				<div className="container text-center">
						<h1>{this.state.zipcode}</h1>
						<WeatherInput
							zip={this.getZipcode.bind(this)}
							lat={this.state.lat}
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
