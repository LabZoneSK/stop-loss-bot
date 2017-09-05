/* Load .env variables to process.env */
require('dotenv').config();

const stopLossBot = require('./bot/stop-loss');


const tick = 1000 * 60 * parseInt(process.env.Tick) || 1000 * 60 * 5;
setInterval(stopLossBot.run, tick);
stopLossBot.run();
