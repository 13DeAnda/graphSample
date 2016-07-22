import React from 'react';

import GraphViewer from './graphViewer.jsx';


export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<GraphViewer />
			</div>
		);
	}
}
