import axios from 'axios';
import { networkTimeout, exchangeServerHistoryEndpoint } from '../constants';

const axiosWithTimeout = axios.create({
    timeout: networkTimeout,
});
export default axiosWithTimeout;

//**************************** Exchange rate server ***********************************/

export function ExchangeEndpoint(onSuccess, onFailure) {
    // axiosWithTimeout.get(exchangeServerHistoryEndpoint)
    axiosWithTimeout.get(exchangeServerHistoryEndpoint,{
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => {
        if (response.statusText === 'OK') {
            onSuccess(response.data);
        } else {
            Promise.reject(response);
        }
    })
    .catch(response => {
        onFailure(response.data);
    });
}