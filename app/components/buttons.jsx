import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';



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
		key: "q1",
		selected: false
	},
	{
		text: "Q2",
		key: "q2",
		selected: false
	},
	{
		text: "Q3",
		key: "q3",
		selected: false
	},
	{
		text: "Q4",
		key: "q4",
		selected: false
	}	
];	

const years= [
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

const styles = {
	carSection:{
		marginBottom: '40px'
	},
	carButton:{
		backgroundColor: '#e6e6e6',
		width: '240px',
		height: '50px',
		boxShadow: '2px 2px 2px  2px #cccccc',
		borderLeft: '1px solid #a6a6a6',
		borderBottom: '1px solid #a6a6a6',
		textAlign: 'center',

	},
	quarterSection:{
		marginBottom: '40px',
		marginLeft: '20px'
	},
	quarterButton:{
		display: 'inline-table',
		backgroundColor: '#e6e6e6',
		height: '40px',
		width: '45px',
		boxShadow: '2px 2px 2px  2px #cccccc',
		borderLeft: '1px solid #a6a6a6',
		borderBottom: '1px solid #a6a6a6',
		textAlign: 'center'
	},
	yearRow:{
		width: '200px',
		marginBottom: '15px;'
	}
};

var Buttons = React.createClass({

	getInitialState() {
		return {
			quarter: quarters[0].key,
			cars: carCounts[0].key
		};
	},
	componentWillMount(){
	},

	carButtonClick(){
		console.log("car button clicked");
	},
	quarterButtonClick(){
		console.log("car button clicked");

	},
	render() {

			
		return (
			<Grid >
				<div style={styles.carSection}>

					{_.map(carCounts, (button, key)=>{
						var selectedStyle = _.clone(styles.carButton);
						
						if(this.state.cars === button.key){
							selectedStyle.background = 'white';
							selectedStyle.fontWeight = 'bold';
						}
						return( 
							<div key={key} style={selectedStyle} onClick={this.carButtonClick}>
								{button.text}
							</div>
						);
					})}
				</div>
				<div style={styles.quarterSection}>
					{_.map(quarters, (button, key)=>{
						var selectedStyle = _.clone(styles.quarterButton);
						
						if(this.state.quarter === button.key){
							selectedStyle.background = 'white';
							selectedStyle.fontWeight = 'bold';
						}
						return( 
							<div key={key} style={selectedStyle} onClick={this.quarterButtonClick}>
								{button.text}
							</div>
						);
					})}
				</div>
				<div style={styles.yearsSection}>
					{_.map(years, (button, key)=>{
						
						return( 
							<div key={key} >
								<div style={{color: button.color, display: 'inline'}} >
									_____________________________
								</div>
								<div style={{marginLeft:'10px', display: 'inline'}} >
									{button.text}
								</div>
							</div>
						);
					})}
				</div>
			</Grid> 
		);
  }
});


module.exports = Buttons;
