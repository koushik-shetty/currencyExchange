import { Actions } from '../constants';

export const ExchangeRatesRequested = () => ({
	type: Actions.currencyRequested,
});

export const ExchangeRatesRequestError = (error) => ({
	type: Actions.currencyRequestError,
	error,
});

export const ExchangeRatesRequestSuccess = (response) => ({
	type: Actions.currencyRequestSuccess,
	exchangeRates: response,
});