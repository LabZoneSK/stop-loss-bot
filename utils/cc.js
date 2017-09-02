const fetch = require('node-fetch');

const histo = (fromSymbol, toSymbol, limit = 3, aggregate = 1, period = 'minute') => new Promise((resolve, reject) => {
  fetch(`${process.env.CCApiURL}histo${period}?fsym=${fromSymbol}&tsym=${toSymbol}&limit=${limit}&aggregate=${aggregate}&e=Poloniex`)
    .then(response => resolve(response.json()))
    .catch((error) => {
      console.log('Cryptocompare API not available.');
      reject(`Cryptocompare API not available.Error: ${error}`);
    });
});

const getPrice = (fromSymbol, toSymbol, exchange) => new Promise((resolve, reject) => {
    fetch(`${process.env.CCApiURL}price?fsym=${fromSymbol}&tsyms=${toSymbol}`)
        .then(response => resolve(response.json()))
        .catch(error => reject(error));
});

module.exports = {
  histo,
  getPrice,
};