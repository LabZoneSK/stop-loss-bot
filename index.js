/* Load .env variables to process.env */
require('dotenv').config();

const stopLossBot = require('./bot/stop-loss');
const config = require('./config');

if (config.stoploss.enabled === true) {
  let tickConfig = parseInt(process.env.Tick);
  if (process.env.Environment === 'development') {
    tickConfig = 1;
  }
  const tick = 1000 * 60 * tickConfig || 1000 * 60 * 5;
  setInterval(stopLossBot.run, tick);
  stopLossBot.run();
}
