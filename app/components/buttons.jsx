import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';
import Button from './button.jsx';

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
	carButtonClick(key){
		this.props.carStateChange(key);
	},

	quarterButtonClick(key){
		this.props.quarterStateChange(key);
	},
	
	render() {	
		return (
			<Grid >
				<div style={styles.carSection}>

					{_.map(this.props.carCounts, (button, key)=>{
						var selectedStyle = _.clone(styles.carButton);
						
						if(this.props.cars === button.key){
							selectedStyle.backgroundColor = 'white';
							selectedStyle.fontWeight = 'bold';
						}
						return( 
							<Button value = {button.key} 
									onClick = {this.carButtonClick} 
									text ={button.text}
									style={selectedStyle} 
									key = {key}/>
						);
					})}
				</div>
				<div style={styles.quarterSection}>
					{_.map(this.props.quarters, (button, key)=>{
						var selectedStyle = _.clone(styles.quarterButton);
						
						if(this.props.quarter === button.key){
							selectedStyle.backgroundColor = 'white';
							selectedStyle.fontWeight = 'bold';
						}
						return( 
							<Button value = {button.key} 
									onClick = {this.quarterButtonClick} 
									text ={button.text}
									style={selectedStyle}
									key = {key} />
						);
					})}
				</div>
				<div style={styles.yearsSection}>
					{_.map(this.props.years, (button, key)=>{
						
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
