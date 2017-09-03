const KrakenClient = require('kraken-api');

const kraken = new KrakenClient(process.env.APIKey, process.env.APISign);

const getBalance = () => {
  return new Promise((resolve, reject) => {
    kraken.api('Balance', null, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });
  });
};

const placeOrder = (pair, type, ordertype, price, volume) => {
  return new Promise((resolve, reject) => {
    const options = {
      pair,
      type,
      ordertype,
      price,
      volume,
    }
    kraken.api('AddOrder', options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });
  });
};

module.exports = {
  getBalance,
  placeOrder,
};