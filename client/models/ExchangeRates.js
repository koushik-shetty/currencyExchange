import Currency from './Currency';

export default class ExchangeRates {
	constructor(date = Date.now(), currencies = []){
		this.date = date;
		this.currencies = currencies;
	}

	getCurrency(currencyCode) {
		let currency = this.currencies.find(currency => {
			return currency.getCode() == currencyCode;
		});
		return currency ? currency: new Currency();
	}

	getAllCurrencies() {
		return this.currencies;
	}

	setExchangeRate(newCurrency) {
		this.currencies = this.currencies.map(currency => {
			if(currency.getCode() == newCurrency.getCode()){
				return newCurrency;
			}
			return currency;
		});
		return this;
	}

	asJSON() {
		return {
			date: this.date,
			currencies: this.currencies,
		}; 
	}

	fromJSON(jsonData) {
		this.date = jsonData.date || Date.now();
		this.currencies = jsonData.currencies || [];
	}
}