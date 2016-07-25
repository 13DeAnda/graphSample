import React from 'react';
import {LineChart} from 'react-d3';

var Graph = React.createClass({
	
	render() {
		var lineColors = ["#ff4dd2","#b366ff", "#80bffff", "#ffff66", "#aaff80", "#ff8c1a", "#e60000"];

		var lineFunction = function(index) {
			return lineColors[index];
		};

		return (
				<div>
					{this.props.carData?
						<LineChart
			                  data={this.props.carData}
			                  colors={lineFunction}
			                  width={1400}
			                  height={400}
			                  title='Cars'/>
			        :null}
		        </div>
		);
  }
});

module.exports = Graph;
