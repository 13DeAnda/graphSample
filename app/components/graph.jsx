import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';
import {LineChart} from 'react-d3';


const styles = {

};

var Graph = React.createClass({
	

	getInitialState() {
		return {
			data: []
		};
	},
	componentWillMount(){
		var data = this.transformGraphData(this.props.carData, this.props.quarter, this.props.cars);
		this.setState({data: data});
	},
	componentWillUpdate(){
		var data = this.transformGraphData(this.props.carData, this.props.quarter, this.props.cars);
		//this.setState({data: data});
		//but can't set state in here whhaaat?
	},

	transformGraphData(data, quarter, counts){
		var graphData =[];
		var indexMap = {};
		var normalizedStart = 0;
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

				var dayOfQuarter = (Number(date[1])-quarter*2)*30+ Number(date[2]);
				
				var carCount = Number(point['car.count']);
				
				if(counts === "daily"){
					graphData[index].values.push({"x": dayOfQuarter, "y": carCount });
				}
				else if(counts === "com"){
					normalizedStart += carCount;
					graphData[index].values.push({"x": dayOfQuarter, "y": normalizedStart });
				}
				else if(counts === "yoy"){
					// assumes there is data for every single day of the year, and all 365 years.//  todo if i get time
					//if there is no previous day on data just put in normalized graph.
					if((i -365) < 0){
						graphData[index].values.push({"x": dayOfQuarter, "y": normalizedStart });
					}
					else{
						var previousYear = carData[i-365];
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
		console.log("the props", this.props);
		// should be accessed from somehwere else?
		var lineColors = ["#b366ff", "#80bffff", "#ffff66", "#aaff80", "#ff8c1a", "#e60000"];

		var lineFunction = function(index) {
			return lineColors[index];
		};
		var lineColor= {2010: "blue", 2011: "red"};
		return (
			<Grid >
			<LineChart
                  data={this.state.data}
                  colors={lineFunction}
                  width={1000}
                  height={400}
                  title='Cars'
                />
			</Grid> 
		);
  }
});


module.exports = Graph;
