import React from "react"

export default class TemperatureBox extends React.Component {
	render() {
		return (
			<div className="well text-center">
				<h1>Today</h1>
				<h3><span className="temperature">{Math.round(this.props.temp)}<small>F</small></span></h3>
				<h3>Humidity: {this.props.humidity}</h3>
				<h3><span className="conditions">{this.props.condition}</span></h3>
				<img src={this.props.icons[this.props.condition]} className="icon"/>
			</div>
		)
	}
}
