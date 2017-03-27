import { parseString } from 'xml2js';

import { ExchangeEndpoint } from '../apis/exchange';

let error = (res) => {
        res.writeHead(500, 'Content-Type', 'application/json');
        res.write(JSON.stringify({
            error: 'internal server error, please try later',
        }));
        res.end();
};

let success = (res, data) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        res.end();
};

export default function exchangeHistory(req, res) {
    ExchangeEndpoint((data) => {
        parseString(data, (err, result) => {
            if (err) {
                error(res);
                return;
            }
            success(res, JSON.stringify(flattenHistoryReponse(result)));
            console.log('sendeer:',flattenHistoryReponse(result));
        });
    }, (errorData) => {
        error(res);
    });
}

function flattenHistoryReponse(json) {
    const history = getHistory(json);
    return {
        provider: getProvider(json),
        latestRate: history[0],
        history,
    };
}

function getProvider(json) {
    const envelope = json['gesmes:Envelope'];
    const sender = envelope && envelope['gesmes:Sender'].length > 0 && envelope['gesmes:Sender'][0];
    return (sender && sender['gesmes:name'].length > 0 && sender['gesmes:name'][0]) || '';

}

function getHistory(json) {
    const envelope = json['gesmes:Envelope'];
    const history = envelope && envelope['Cube'].length > 0 && envelope['Cube'][0].Cube;
    return history.map(singleDay => {
        return {
            date: singleDay.$.time,
            rates: singleDay.Cube.map(currency => {
                if (currency) {
                    return {
                        currency: currency.$.currency,
                        rate: currency.$.rate,
                    };
                }
            })
            .filter(rate => rate != undefined),
        };
    });
}