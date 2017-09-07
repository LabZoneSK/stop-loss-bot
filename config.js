const config = {
  "profit-target": {
    "enabled": false,
    //Not implemebted yet.
  },
  "stoploss": {
    "enabled": true,
    "strategy": "stop-loss", //Can be also trailing-stop
    "assets": [{
        "symbol": "LTC",
        "kraken": "XLTC",
        "target": 50,
      },
      {
        "symbol": "BTC",
        "kraken": "XXBT",
        "target": 3600,
      },
      {
        "symbol": "DASH",
        "kraken": "DASH",
        "target": 0,
      },
      {
        "symbol": "XRP",
        "kraken": "XXRP",
        "target": 0.14,
      },
      {
        "symbol": "ETH",
        "kraken": "XETH",
        "target": 200,
      },
      {
        "symbol": "ETC",
        "kraken": "XETC",
        "target": 20,
      },
      {
        "symbol": "BCH",
        "kraken": "BCH",
        "target": 0,
      },
      {
        "symbol": "XMR",
        "kraken": "XXMR",
        "target": 75,
      },
      {
        "symbol": "ZEC",
        "kraken": "XZEC",
        "target": 0,
      }
    ]
  }
};

module.exports = config;
