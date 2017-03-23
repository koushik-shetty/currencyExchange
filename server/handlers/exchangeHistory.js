import axios from 'axios';

import URL from '../constants';

export default function exchangeHistory(successCb = ()=>{}, errorCb = ()=> {}){
    axios.get(URL.exchangeServerHistoryEndpoint)
    .then(response => {
        if (response.statusText === 'OK') {
            successCb(response);
        } else {
            Promise.reject(response);
        }
    })
    .catch(reject => {
        errorCb(reject);
    });
}