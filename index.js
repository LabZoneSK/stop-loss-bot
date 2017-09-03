/* Load .env variables to process.env */
require('dotenv').config();

const config = require('./config');
const cc = require('./utils/cc');
const kraken = require('./exchanges/kraken');

const balance = null;
const doStuff = () => {
    //Here will be logic which will run every 15 minutes
    config.assets.map((asset) => {
        const assetData = asset;
        cc.getPrice(asset.symbol,'EUR', 'CCAGG').then((data) => {
            const price = data;
            if(price.EUR) {
                const isBellowTarget = price.EUR < assetData.target;
                if(isBellowTarget) {
                    console.log(`${assetData.symbol} is bellow target.`);
                    if(balance === null) {
                        const balancePromise = kraken.getBalance();
                        balancePromise.then((data) => {
                            const amount = data[assetData.kraken];
                            if(amount && parseFloat(amount).toFixed(3) > 0) {
                                console.log(`I am going to sell ${assetData.symbol} for ${price.EUR}. Amount is ${amount}`);
                                if(assetData.symbol === 'BTC') {
                                    assetData.symbol = 'XBT';
                                }     
                                if(process.env.Environment === 'production') {
                                    kraken.placeOrder(`${assetData.symbol}EUR`, 'sell', 'market', price.EUR, amount).then((data) => {
                                        if(data.descr) {
                                            console.log(`Order placed: ${data.descr}`);
                                        }
                                    })
                                    .catch(error => console.log(error));   
                                }     
                            }
                        })
                        .catch(error => console.log(error));
                    } else {
                        const amount = balance[assetData.kraken];
                        if(amount && parseFloat(amount).toFixed(3) > 0) {
                            console.log(`I am going to sell ${assetData.symbol} for ${price.EUR}. Amount is ${amount}`);
                            if(assetData.symbol === 'BTC') {
                                assetData.symbol = 'XBT';
                            }       
                            kraken.placeOrder(`${assetData.symbol}EUR`, 'sell', 'market', price.EUR, amount).then((data) => {
                                if(data.descr) {
                                    console.log(`Order placed: ${data.descr}`);
                                }
                            })
                            .catch(error => console.log(error));        
                        }
                    }
                } else {
                    //console.log(`Currency ${assetData.symbol} is still fine. Current price ${price.EUR} and target is ${assetData.target}`);   
                }
            } else {
                console.log(`Something went wrong. Cannot get price for ${asset.symbol}`);
            }
        })
        .catch(error => console.log(error));
    });
};

const tick = 1000 * 60 * 5; 
setInterval(doStuff, tick);
doStuff();