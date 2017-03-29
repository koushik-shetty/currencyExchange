import React, { Component } from 'react';
import { connect } from 'react-redux';


import Spinner from './components/Spinner.jsx';
import Exchange from './components/Exchange.jsx';
import { ExchangeEndpoint } from './apis/ExchangeRate';
import xmlToJson from './utils/xmlToJson';
import Currency from './models/Currency';

import * as actions from './actions/ExchangeRates';

export class App extends Component {
	constructor(props) {
		super(props);
		this.onFailure = this.onFailure.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.state = {
			error: {
				status: false,
				message: '',
			},
			showSpinner: false,
		};
	}

	onSuccess(data) {
		this.setState({ showSpinner: false });
		this.props.dispatch(actions.ExchangeRatesRequestSuccess(data));
	}

	onFailure(data) {
		this.setState({ showSpinner: false });
		this.props.dispatch(actions.ExchangeRatesRequestError(data));
	}

	componentDidMount() {
		this.setState({ showSpinner: true });
		ExchangeEndpoint(this.onSuccess, this.onFailure);
	}

	_createCurrencies(data = []) {
		return data
		.map(exchangeRate => {
			if (exchangeRate.currency && exchangeRate.rate) {
				return new Currency(exchangeRate.currency, exchangeRate.rate);
			}
		})
		.filter(currencies => currencies != undefined);
	}

	render() {
		const rates = (this.props.latestExchangeRate.latestRate && this.props.latestExchangeRate.latestRate.rates) || [];
		return (
			<div>
				<Spinner show={this.state.showSpinner}>
					<Exchange currencies={this._createCurrencies(rates)} />
				</Spinner>
			</div>
		);
	}
}

const mapStoreToProps = function (state) {
	return {
		latestExchangeRate: state.exchangeRates.exchangeRates || {},
	};
};

export default connect(mapStoreToProps)(App);
