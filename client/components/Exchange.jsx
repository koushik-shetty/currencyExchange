import React, { Component, PropTypes } from 'react';

import CurrencySelect from './CurrencySelect.jsx';
import Currency from '../models/Currency';

export default class Exchange extends Component {
    constructor(props) {
        super(props);
        const initCurrency = (props.currencies > 0 && props.currencies[0]) || new Currency('EUR', 1);
        this.state = {
            currencyA: initCurrency,
            currencyB: initCurrency,
            currencyAQuantity: 0,
            currencyBQuantity: 0,
        };
        this._onCurrencyAQuantityChanged = this._onCurrencyAQuantityChanged.bind(this);
        this._onCurrencyBQuantityChanged = this._onCurrencyBQuantityChanged.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const initCurrency = (nextProps.currencies.length > 0 && nextProps.currencies[0]) || new Currency('EUR', 1);
        console.log('props', nextProps.currencies.length > 0 && nextProps.currencies[0], initCurrency);
        this.setState({
            currencyA: initCurrency,
            currencyB: initCurrency,
        });
    }


    _onCurrencyAQuantityChanged({ target: { value } }) {
        const { currencyA, currencyB } = this.state;
        this.setState({
            currencyAQuantity: value,
            currencyBQuantity: this._convert(currencyA, currencyB, value),
        });
    }

    _onCurrencyBQuantityChanged({ target: { value } }) {
        const { currencyA, currencyB } = this.state;
        this.setState({
            currencyBQuantity: value,
            currencyAQuantity: this._convert(currencyB, currencyA, value),
        });
    }

    _convert(fromCurrency, toCurrency, multiplier) {
        const value = toCurrency.getCurrencyValue() * multiplier / fromCurrency.getCurrencyValue();
        return value;
    }

    render() {
        // console.log('exc:', this.props);
        return (
            <div>
                <CurrencySelect
                    currencies={this.props.currencies}
                    name='source'
                    id='source-currency'
                    onSelect={currencyA => this.setState({
                        currencyA,
                        currencyAQuantity: this._convert(this.state.currencyB, currencyA, this.state.currencyBQuantity) 
                    })}
                />
                <CurrencySelect
                    currencies={this.props.currencies}
                    name='target'
                    id='target-currency'
                    onSelect={currencyB => this.setState({
                        currencyB,
                        currencyBQuantity: this._convert(this.state.currencyA, currencyB, this.state.currencyAQuantity) 
                    })}
                />
                <input type="number" onChange={this._onCurrencyAQuantityChanged} value={this.state.currencyAQuantity} />
                <input type="number" onChange={this._onCurrencyBQuantityChanged} value={this.state.currencyBQuantity} />
            </div>
        );
    }
}

Exchange.defaultProps = {
    currencies: [],
};

Exchange.propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.object),
};
