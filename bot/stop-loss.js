const config = require('../config');
const cc = require('../utils/cc');
const kraken = require('../exchanges/kraken');
const email = require('../notifications/email');
const balance = null;

const sendSellNotify = (symbol, price, amount) => {
  if (process.env.EmailNotifiactions === 'true') {
    email.sendEmail({
      to: process.env.OwnerEmail,
      subject: 'BOT: Placed sell order',
      html: `<p>Bot is going to sell</p>
           <p>
          Symbol:${symbol}<br/>
          Amount:${amount}<br/>
          Price:${price}<br/>
          </p>`,
    });
  }
};

const sendTargetNotify = (symbol, price, target) => {
  if (process.env.EmailNotifiactions === 'true') {
    email.sendEmail({
      to: process.env.OwnerEmail,
      subject: `BOT: Symbol ${symbol} close to target`,
      html: `<p>The symbol ${symbol} is close to target. Update target if you don't want to sell yet!</p>
           <p>
          Symbol:${symbol}<br/>
          Target price:${target}<br/>
          Current price:${price}<br/>
          </p>`,
    });
  }
};

const sell = (amount, symbol, price, precision = process.env.DefaultPrecision) => {
  if (amount && parseFloat(amount).toFixed(3) > 0) {
    console.log(`I am going to sell ${symbol} for ${price}. Amount is ${amount}`);
    sendSellNotify(symbol, price, amount);

    //Kraken uses XBT for BTC in tradeable pairs
    if (symbol === 'BTC') {
      symbol = 'XBT';
    }

    //Price precision needs to be fixed based on requirements from Kraken. For example> BTC precision must be 2.
    const sellPrice = Number(price).toFixed(precision) || price;

    if (process.env.Environment === 'production') {
      kraken.placeOrder(`${symbol}EUR`, 'sell', 'market', sellPrice, amount).then((data) => {
          if (data.descr) {
            return data.descr;
          }
        })
        .catch(error => console.log(error));
    } else {
      console.log(`Selling ${symbol} by market price (${sellPrice}).`)
    }
  }
};

const run = () => {
  config.stoploss.assets.map((asset) => {
    const assetData = asset;
    cc.getPrice(asset.symbol, 'EUR', 'CCAGG').then((data) => {
        const price = data;
        if (price.EUR) {
          const isBelowTarget = price.EUR < assetData.target;
          if (isBelowTarget) {
            console.log(`${assetData.symbol} is below target.`);
            if (balance === null) {
              const balancePromise = kraken.getBalance();
              balancePromise.then((data) => {
                  sell(data[assetData.kraken], assetData.symbol, price.EUR, assetData.precision);
                })
                .catch(error => console.log(error));
            } else {
              sell(balance[assetData.kraken], assetData.symbol, price.EUR);
            }
          } else if ((Number(price.EUR).toFixed(2) * 1.05) < assetData.target) {
            sendTargetNotify(assetData.symbol, price.EUR, assetData.target);
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
