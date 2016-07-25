import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';

import Graph from './graph.jsx';
import Buttons from './buttons.jsx';
import customData from './cars-by-day.json';
import constants from './constants';

const styles = {
	containerGraphViewer:{
		marginTop: '50px',
		marginLeft: '50px'
	}
};

var GraphViewer = React.createClass({

	getInitialState() {
		var cars = constants.carCounts[0].key;
		var quarter = constants.quarters[0].key;
		var data = this.transformGraphData(customData.values, quarter, cars);

		return {
			quarter: quarter,
			cars: cars,
			data: data
		};
	},

	carStateChange(cars){
		var quarter = this.state.quarter;
		var data = this.transformGraphData(customData.values, quarter, cars);
		this.setState({cars: cars, data: data});
	},

	quarterStateChange(quarter){
		var cars = this.state.cars
		var data = this.transformGraphData(customData.values, quarter, cars);
		this.setState({quarter: quarter, data: data});
	},
	transformGraphData(data, quarter, counts){
		var graphData =[];
		var indexMap = {};
		var currentYear = "";
		var normalizedStart = "";
		var that = this;
		_.forEach(data, function(point, i){

			if(point['fiscal.quarter'] === quarter){

				var year = point['fiscal.year'];

				if(!indexMap[year]){
					graphData.push({
						name: point['fiscal.year'],
						values: []
					});

					indexMap[year]=graphData.length;
				}
				var index = indexMap[year]-1;
				var date = point.date.split("-");

				var dayOfQuarter = graphData[index].values.length + 1;

				var carCount = Number(point['car.count']);
				if(counts === "daily"){
					graphData[index].values.push({"x": dayOfQuarter, "y": carCount });
				}
				else if(counts === "com"){
					if(currentYear !== year){
						normalizedStart = 0;
						currentYear = year;
					}

					normalizedStart += carCount;
					graphData[index].values.push({"x": dayOfQuarter, "y": normalizedStart });
				}
				else if(counts === "yoy"){
					if((i -365) > -1){
						var previousYear = data[i-365];
						var cars = Number(previousYear['car.count']);
						var yoyValue = carCount - cars;
						graphData[index].values.push({"x": dayOfQuarter, "y": yoyValue });
					}
				}			
			}
		});
		return graphData;
	},

	render() {
		return (
			<Grid style={styles.containerGraphViewer} >
				<Row>
					<Col sm={3} >
						<Buttons 
							carStateChange = {this.carStateChange}
							quarterStateChange = {this.quarterStateChange}
							quarters = {constants.quarters}
							quarter = {this.state.quarter}
							carCounts = {constants.carCounts}
							cars = {this.state.cars}
							years = {constants.years}/>
					</Col>
					<Col sm={7}>
						<Graph carData = {this.state.data} />
					</Col>
				</Row>
			</Grid> 
		);
  }
});


module.exports = GraphViewer;
