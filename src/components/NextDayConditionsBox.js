import React from 'react';
import $ from "jquery";

export default class NextDayConditionsBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			//state for next day weather
			day1_day: "",
			day1_temp_high: 0,
			day1_temp_low:  0,
			day1_conditions: "",
			//state for the day after next weather
			day2_day: "",
			day2_temp_high: 100,
			day2_temp_low:  5,
			day2_conditions: ""
		}
	}

componentDidMount() {
	//get initial weather forecasts when page loads
	getConditions(this);

}
componentDidUpdate() {
			const nextDayThis = this;
			let zipcode
			if (this.props.zipcode.length < 5) {
				zipcode = "62220";
			} else {
				zipcode = this.props.zipcode;
			}
			let link = "https://api.wunderground.com/api/e9f795d54303e612/forecast/q/"+ zipcode  +".json";

			//forecast ajax call

			if(this.props.zipcode.length >= 4) {
			$.ajax({
							url: link,
							type: 'GET',
							//see the use of context (refers back to react object)
							context: this,
							async: true,
							dataType: "json",
							success: function (data) {
								//create variables for day 1
								let day1_day = data.forecast.simpleforecast.forecastday[1].date.weekday;
								let day1_temp_high = data.forecast.simpleforecast.forecastday[1].high.fahrenheit;
								let day1_temp_low =  data.forecast.simpleforecast.forecastday[1].low.fahrenheit;
								let day1_conditions =  data.forecast.simpleforecast.forecastday[1].conditions
								//create variables for day 2
								let day2_day = data.forecast.simpleforecast.forecastday[2].date.weekday;
								let day2_temp_high = data.forecast.simpleforecast.forecastday[2].high.fahrenheit;
								let day2_temp_low =  data.forecast.simpleforecast.forecastday[2].low.fahrenheit;
								let day2_conditions =  data.forecast.simpleforecast.forecastday[2].conditions
								// set states for day 1 and day 2;
								console.log("forecast success!");
								if(nextDayThis.state.day1_temp_high !== day1_temp_high) {
									// console.log("state already set")
									console.log("changing state")
									nextDayThis.setState({
										//update state for day 1
										day1_day: day1_day,
										day1_temp_high: day1_temp_high,
										day1_temp_low: day1_temp_low,
										day1_conditions: day1_conditions,
										//update state for day 2
										day2_day: day2_day,
										day2_temp_high: day2_temp_high,
										day2_temp_low: day2_temp_low,
										day2_conditions: day2_conditions

								});
								}
								console.log(data.forecast.simpleforecast.forecastday)
							}
					});
				}
	}
	render() {
		return (
			<div>
			   <div className="col-sm-6">
						<div className="well text-center">
							<h1>{this.state.day1_day}</h1>
							<h3 className="h3_temperature"> {this.state.day1_temp_high}<small>F</small> Hi</h3>
							<h3><span className="temperature">{this.state.day1_temp_low}<small>F</small></span> Lo</h3>
							<h3><span className="">{this.state.day1_conditions}</span></h3>
							<img src={this.props.icons[this.state.day1_conditions]} className="icon"/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="well text-center">
							<h1>{this.state.day2_day}</h1>
							<h3>{this.state.day2_temp_high}<small>F</small> Hi</h3>
							<h3>{this.state.day2_temp_low}<small>F</small> Lo</h3>
							<h3>{this.state.day2_conditions}</h3>
							<img src={this.props.icons[this.state.day2_conditions]} className="icon"/>
						</div>
					</div>
				</div>
		)
	}
}

function getConditions(object) {
	  let zipcode = "50517";
		const nextDayThis = object;
		let link = "https://api.wunderground.com/api/e9f795d54303e612/forecast/q/"+ zipcode  +".json";
	$.ajax({
					url: link,
					type: 'GET',
					//see the use of context (refers back to react object)
					context: nextDayThis,
					async: true,
					dataType: "json",
					success: function (data) {
						//create variables for day 1
						let day1_day = data.forecast.simpleforecast.forecastday[1].date.weekday;
						let day1_temp_high = data.forecast.simpleforecast.forecastday[1].high.fahrenheit;
						let day1_temp_low =  data.forecast.simpleforecast.forecastday[1].low.fahrenheit;
						let day1_conditions =  data.forecast.simpleforecast.forecastday[1].conditions
						//create variables for day 2
						let day2_day = data.forecast.simpleforecast.forecastday[2].date.weekday;
						let day2_temp_high = data.forecast.simpleforecast.forecastday[2].high.fahrenheit;
						let day2_temp_low =  data.forecast.simpleforecast.forecastday[2].low.fahrenheit;
						let day2_conditions =  data.forecast.simpleforecast.forecastday[2].conditions

						if(nextDayThis.state.day1_temp_high !== day1_temp_high) {
							// console.log("state already set")
							console.log("changing state")
							nextDayThis.setState({
								//update state for day 1
								day1_day: day1_day,
								day1_temp_high: day1_temp_high,
								day1_temp_low: day1_temp_low,
								day1_conditions: day1_conditions,
								//update state for day 2
								day2_day: day2_day,
								day2_temp_high: day2_temp_high,
								day2_temp_low: day2_temp_low,
								day2_conditions: day2_conditions

						});
						}
					}
});
}
