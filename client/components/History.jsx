import React, { Component } from 'react';

import HistoryChart from './HistoryChart.jsx';
import CurrencySelect from './CurrencySelect.jsx';

class ExchangeHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        };
        this._onCurrecySelect = this._onCurrecySelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this._makeData(nextProps.currencies.length > 0 && nextProps.currencies[0], nextProps.data);
    }


    _onCurrecySelect(currency) {
        this._makeData(currency, this.props.data);
    }

    _makeData(currency, data = []) {
        if (currency) {
            const exchangeHistory = data.map(rate => {
                return {
                    x: new Date(rate.date).valueOf(),
                    y: Number(rate.rates.find(curr => curr.currency === currency.getCode()).rate),
                };
            });
            this.setState({
                data: exchangeHistory.sort((a, b) => a.x - b.x),
            });
        }
    }

    render() {
        return (
            <div>
                <CurrencySelect name='source'
                    id='history-currency'
                    currencies={this.props.currencies}
                    onSelect={this._onCurrecySelect}
                />
                <HistoryChart data={this.state.data} />
            </div>
        );
    }
}


ExchangeHistory.defaultProps = {
    data: [],
    currencies: [],
};

export default ExchangeHistory;