export const Actions = {
	currencyRequested: 'CURRENCY_REQUESTED',
	currencyRequestSuccess: 'CURRENCY_REQUEST_SUCCESS',
	currencyRequestError: 'CURRENCY_REQUEST_ERROR',
};

export const networkTimeout = 10 * 1000; //10s
export const exchangeServerHistoryEndpoint = `http://localhost:8091/history`;