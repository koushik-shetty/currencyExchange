import React, { Component, PropTypes } from 'react';

import ReactSpinner from 'react-spinkit';
require('../../styles/Spinner.css');

class Spinner extends Component {
	render() {
		if (this.props.show) {
			return (
				<div className="spinner-container" >
					<ReactSpinner spinnerName="circle" className="spinner" noFadeIn />
					<div className="spinner-text" >Please wait while we are loading Exchange rates...</div>
				</div>
			);
		}
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

Spinner.propTypes = {
	show: PropTypes.bool,
};

Spinner.defaultProps = {
	show: false,
};

export default Spinner;

