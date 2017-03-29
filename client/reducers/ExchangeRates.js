import { Actions } from '../constants';

export default function(state = {}, { type, exchangeRates }) {
    if (type == Actions.currencyRequestSuccess) {
        return Object.assign({}, state, { exchangeRates: exchangeRates });
    }
    return state;
}