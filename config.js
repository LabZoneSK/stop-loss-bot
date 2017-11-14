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
        "target": 150,
      },
      {
        "symbol": "BTC",
        "kraken": "XXBT",
        "target": 4500,
        "precision": 1,
      },
      {
        "symbol": "DASH",
        "kraken": "DASH",
        "target": 0,
      },
      {
        "symbol": "XRP",
        "kraken": "XXRP",
        "target": 0,
      },
      {
        "symbol": "ETH",
        "kraken": "XETH",
        "target": 270,
      },
      {
        "symbol": "ETC",
        "kraken": "XETC",
        "target": 0,
      },
      {
        "symbol": "BCH",
        "kraken": "BCH",
        "target": 0,
      },
      {
        "symbol": "XMR",
        "kraken": "XXMR",
        "target": 0,
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
