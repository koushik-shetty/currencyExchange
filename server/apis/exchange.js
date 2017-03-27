import axios from 'axios';
import URL, { networkTimeout } from '../constants';

const axiosWithTimeout = axios.create({
    timeout: networkTimeout,
});
export default axiosWithTimeout;

//**************************** Exchange rate server ***********************************/

export function ExchangeEndpoint(onSuccess, onFailure) {
    // axiosWithTimeout.get(exchangeServerHistoryEndpoint)
    axiosWithTimeout.get(URL.exchangeServerHistoryEndpoint,{
        headers: {
            'Accept': 'application/xml',
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
        console.log("rej:", response);
        onFailure(response.data);
    });
}
