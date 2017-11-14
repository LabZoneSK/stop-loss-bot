/* Load .env variables to process.env */
require('dotenv').config();
const fs = require('fs');

const fetch = require('node-fetch');

const symbols = ['ZEC', 'XRP', 'XMR', 'LTC', 'ETC', 'ETH', 'EOS', 'DASH', 'REP', 'BTC'];

const getSymbolHisto = (symbol) => {
  return new Promise((resolve, reject) => {
    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=EUR&limit=90&aggregate=3&e=CCCAGG`)
      .then(response => resolve(response.json()))
      .catch((error) => {
        console.log('Cryptocompare API not available.');
        reject(`Cryptocompare API not available.Error: ${error}`);
      });
  })
};

let history = {};
symbols.map((symbol) => {
  getSymbolHisto(symbol)
    .then((cc) => {
      history[symbol] = cc.Data.map((OHCL) => OHCL.close);
      fs.writeFileSync('./data.json', JSON.stringify(history), 'utf8', function(err, contents) {
        //console.log(contents);
      });
    })
    .catch(error => console.log(error));
});
