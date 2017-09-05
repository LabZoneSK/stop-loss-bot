const config = require('../config');
const cc = require('../utils/cc');
const kraken = require('../exchanges/kraken');

const balance = null;

const sell = (amount, symbol, price) => {
  if (amount && parseFloat(amount).toFixed(3) > 0) {
    console.log(`I am going to sell ${symbol} for ${price}. Amount is ${amount}`);

    //Kraken uses XBT for BTC in tradeable pairs
    if (symbol === 'BTC') {
      symbol = 'XBT';
    }

    if (process.env.Environment === 'production') {
      kraken.placeOrder(`${symbol}EUR`, 'sell', 'market', price, amount).then((data) => {
          if (data.descr) {
            return data.descr;
          }
        })
        .catch(error => console.log(error));
    } else {
      console.log(`Selling ${symbol} by market price.`)
    }
  }
};

const run = () => {
  config.assets.map((asset) => {
    const assetData = asset;
    cc.getPrice(asset.symbol, 'EUR', 'CCAGG').then((data) => {
        const price = data;
        if (price.EUR) {
          const isBellowTarget = price.EUR < assetData.target;
          if (isBellowTarget) {
            console.log(`${assetData.symbol} is bellow target.`);
            if (balance === null) {
              const balancePromise = kraken.getBalance();
              balancePromise.then((data) => {
                  sell(data[assetData.kraken], assetData.symbol, price.EUR)
                })
                .catch(error => console.log(error));
            } else {
              sell(balance[assetData.kraken], assetData.symbol, price.EUR);
            }
          } else {
            //TODO: How to signalize that all is fine and bot is running.
          }
        } else {
          console.log(`Something went wrong. Cannot get price for ${asset.symbol}`);
        }
      })
      .catch(error => console.log(error));
  });
};

module.exports = {
  run,
};
