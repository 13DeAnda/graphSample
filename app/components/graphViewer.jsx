import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';

import Graph from './graph.jsx';
import Buttons from './buttons.jsx';
import customData from './cars-by-day.json';

const styles = {
	containerGraphViewer:{
		marginTop: '50px',
		marginLeft: '50px'
	}
};
const carCounts = [
	{
		text: "daily Normalized Car Counts",
		key: "daily",
		selected: false
	},
	{
		text: "Comulative Car Counts",
		key: "com",
		selected: false
	},
	{
		text: "YoY Change in Car Counts",
		key: "yoy",
		selected: false
	}
];

const quarters= [
	{
		text: "Q1",
		key: 1,
		selected: false
	},
	{
		text: "Q2",
		key: 2,
		selected: false
	},
	{
		text: "Q3",
		key: 3,
		selected: false
	},
	{
		text: "Q4",
		key: 4,
		selected: false
	}	
];	

const years= [
	{
		text: "2009",
		color: "#ff4dd2"
	},
	{
		text: "2010",
		color: "#b366ff"
	},
	{
		text: "2011",
		color: "#80bffff"
	},
	{
		text: "2012",
		color: "#ffff66"
	},
	{
		text: "2013",
		color: "#aaff80"
	},
	{
		text: "2014",
		color: "#ffff99"
	},
	{
		text: "2015",
		color: "#ff8c1a"
	},
	{
		text: "2016",
		color: "#e60000"
	},
];


var GraphViewer = React.createClass({

	getInitialState() {
		var cars = carCounts[0].key;
		var quarter = quarters[0].key;
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
							quarters = {quarters}
							quarter = {this.state.quarter}
							carCounts = {carCounts}
							cars = {this.state.cars}
							years = {years}/>
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
