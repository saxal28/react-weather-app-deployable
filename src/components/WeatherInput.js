//========================
//   WEATHER INPUT
//  gets zipcode input
//========================

import React from "react"

export default class WeatherInput extends React.Component {
	render() {
		return (
			<div id="search-container  pagination-centered">
				<div>
					<input type="text" className="form-control" placeholder="enter 5-digit zip code" id="search-input"
						onChange={ this.props.change } />
				</div>
			</div>
		)
	}
}
