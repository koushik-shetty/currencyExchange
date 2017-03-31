import React, { Component, PropTypes } from 'react';

export default class CurrencySelect extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    _onChange({ target: { value: code } }) {
        const selectedCurrency = this.props.currencies.find(currency => {
            return currency.getCode() === code;
        });
        this.props.onSelect(selectedCurrency);
    }

    render() {
        return (
            <div className="currency-select-container">
                <select className="currency-select" name={this.props.name} id={this.props.id} onChange={this._onChange}>
                    {
                        this.props.currencies
                            .map(currency =>
                                <option key={currency.getCode()} value={currency.getCode()}>
                                    {currency.getCode()}
                                </option>
                            )
                    }
                </select>
            </div>
        );
    }
}

CurrencySelect.propTypes = {
    currencies: PropTypes.array,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
};

CurrencySelect.defaultProps = {
    currencies: [],
    onSelect: () => { },
};