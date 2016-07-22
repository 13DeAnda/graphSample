import React from 'react';
import _ from 'lodash';
import {Row, Col, Grid} from 'react-bootstrap';

import Graph from './graph.jsx';
import Buttons from './buttons.jsx';

const styles = {
	container:{
		marginTop: '50px',
		marginLeft: '50px'
	}
};

var GraphViewer = React.createClass({

	getInitialState() {
		return {
		};
	},
	componentWillMount(){
	},



	render() {

			
		return (
			<Grid style={styles.container} >
				<Row>
					<Col sm={4} >
						<Buttons />
					</Col>
					<Col sm={6}>
						<Graph />
					</Col>
				</Row>
			</Grid> 
		);
  }
});


module.exports = GraphViewer;
