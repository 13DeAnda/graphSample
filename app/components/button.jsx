import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';

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

var Button = React.createClass({

	onClick(){
		this.props.onClick(this.props.value);
	},
	render() {

			
		return (

			<div style={this.props.style} onClick={this.onClick}>
				{this.props.text}
			</div>
				
		);
  }
});

module.exports = Button;
