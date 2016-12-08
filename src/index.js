//this is the main javascript file

import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
import $ from "jquery";

//components
import WeatherInput from "./components/WeatherInput";
import TemperatureBox from "./components/TemperatureBox";
import NextDayConditionsBox from "./components/NextDayConditionsBox";


//===============================================
//					     CONTAINER COMPONENT
//			this container renders all components
//===============================================

class WeatherBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			zipcode: "",
			full_location: "",
			temp: "",
			condition: "",
			search: "",
			humidity: "",
			coordinates: ""
		}
	}
	componentWillMount() {
		const ojb = this;
	
	}
	componentDidMount() {
		//set background color;
		// document.body.style = 'background:url(http://i.imgur.com/2KUoLff.gif); background-size:cover';
		document.body.style = "background:url(http://i.imgur.com/B7NdGJo.jpg); background-size:cover; background-attachment: fixed"
		
		// saves WeatherBox as a global object
		var ojb = this;
		
		//gets gps coordinates
			navigator.geolocation.getCurrentPosition(function(position) {
   				console.log(position.coords.latitude, position.coords.longitude);
				let coords =  position.coords.latitude + "," + position.coords.longitude;
				ojb.setState({coordinates: coords})
				console.log("cordinates:" + ojb.state.coordinates)
			});
		
		//sets timeout so the coordinate state can render and we can call it in link
		setTimeout(function() {

		var link = "https://api.wunderground.com/api/e9f795d54303e612/conditions/q/" + ojb.state.coordinates + ".json";

		//ajax call to get weather data
			$.ajax({
							url: link,
							type: 'GET',
							//see the use of context (refers back to react object)
							context: ojb,
							async: true,
							// crossDomain: true,
    					// dataType: 'jsonp',
							dataType: "json",
							success: function (data) {
									console.log(data.current_observation)
									let current_location = data.current_observation.display_location.full;
									let temp = data.current_observation.temp_f;
									let condition = data.current_observation.weather;
									let humidity = data.current_observation.relative_humidity;
									this.setState({full_location: current_location, temp:temp, condition:condition, humidity: humidity});
							}
		
		//end timeout function
		});
		}, 500);
	 }
	 
	 

	handleZipChange(e) {
		if (this.state.search.length >= 4) {
			this.setState({search: e.target.value})
				var zipcode = $("#search-input").val();
				console.log(this.state.seach)
				var link = "https://api.wunderground.com/api/e9f795d54303e612/conditions/q/" + zipcode + ".json";

        // THIS GETS THE WEAHER INFO FROM API;
				$.ajax({
								url: link,
								type: 'GET',
								//see the use of context (refers back to react object)
								context: this,
								async: true,
								dataType: "json",
								success: function (data) {
										console.log(data.current_observation);
										let full_location = data.current_observation.display_location.full;
										let temp = data.current_observation.temp_f;
										let condition = data.current_observation.weather;
										this.setState({full_location: full_location, zipcode: zipcode, temp: temp, condition: condition});
								}
						});
		} else {
			 this.setState({search: e.target.value})
		}
			//=======================================================================================================================
	}


	handleChange(e) {
		this.setState({search: e.target.value})
	}

	render() {

	var icons = {
		"Clear": "https://cdn1.iconfinder.com/data/icons/linear-weather-icons/100/meteo_sunny-512.png",
		"Partly Cloudy": "http://downloadicons.net/sites/default/files/partly-cloudy-day-icon-61624.png",
		"Rain": "http://icons.veryicon.com/ico/System/Icons8%20Metro%20Style/Weather%20Rain.ico",
		"Mostly Cloudy": "http://image.flaticon.com/icons/svg/53/53934.svg",
		"Overcast": "http://image.flaticon.com/icons/svg/53/53934.svg",
		"Scattered Clouds": "http://image.flaticon.com/icons/svg/53/53934.svg",
		"Chance of Rain": "http://www.mikeafford.com/store/store-images/ms01b_example_heavy_rain_showers.png",
		"Light Snow": "https://cdn4.iconfinder.com/data/icons/weathercons/64/snow-512.png",
		"Snow": "http://i.imgur.com/RAVaruD.png"

	}
		return (
			<div className="container">
				<h1 className="text-center">Weather for: {this.state.search}</h1>
				<h3 className="text-center">{this.state.full_location}</h3>
				<WeatherInput change={this.handleZipChange.bind(this)} onChange={this.handleChange.bind(this)} zipcode={this.state.zipcode}/>
				<div className="row">
					<div className="col-md-6">
							<TemperatureBox temp={this.state.temp} condition={this.state.condition} humidity={this.state.humidity} icons={icons}/>
					</div>
					<div className="col-md-6">
							<NextDayConditionsBox zipcode={this.state.zipcode} day1_day={this.state.temp} icons={icons}/>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
  <WeatherBox />
  , document.querySelector('#container')
);
