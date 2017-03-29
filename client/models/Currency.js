export default class Currency{
	constructor(currencyCode, value){
		this.currencyCode = currencyCode;
		this.value = value;
	}

	getCode() {
		return this.currencyCode;
	}

	getCurrencyValue() {
		return this.value;
	}
}