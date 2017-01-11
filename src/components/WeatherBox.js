import React from "react";
import axios from 'axios';

import WeatherInput from "./WeatherInput";
import ForecastsBox from "./ForecastsBox";

var icons = {
  "Clear": "https://image.flaticon.com/icons/svg/53/53565.svg",
  "Partly Cloudy": "https://downloadicons.net/sites/default/files/partly-cloudy-day-icon-61624.png",
  "Rain": "https://image.flaticon.com/icons/svg/54/54456.svg",
  "Mostly Cloudy": "https://image.flaticon.com/icons/svg/53/53934.svg",
  "Overcast": "https://maxcdn.icons8.com/Share/icon/Weather//clouds1600.png",
  "Scattered Clouds": "https://image.flaticon.com/icons/svg/53/53934.svg",
  "Chance of Rain": "https://www.mikeafford.com/store/store-images/ms01b_example_heavy_rain_showers.png",
  "Light Snow": "https://cdn4.iconfinder.com/data/icons/weathercons/64/snow-512.png",
  "Snow": "https://i.imgur.com/RAVaruD.png",
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
