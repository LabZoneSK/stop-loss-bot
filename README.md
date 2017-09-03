
## About

This is simple bot to place sell order on Kraken exchange when price drops to configured target.
It creates "safety net" to prevent you loss more than you want.

The logic is following:
* Check target price for each currency
* If current price is bellow target, place sell order
* Order type is market to make sure that order will be sucessful
* Current logic will sell whole amount of currency

## Basic commands

Usage
---
 
Install all dependecies
 
```
npm install
```
 
Run the bot
---
 
```
npm start
```

**Current code is work in progress. Please, use with caution. Do not connect to
your Kraken account until you are sure that you know what you are doing. Otherwise you can loose your money!!!**

If you want to contribute or you have any ideas or questions, do not hesitate to contact me.

Twitter: [@starosta83](https://twitter.com/starosta83)

Email: martin.starosta83@gmail.com

I will be very happy if this bot helps you to loss your money and provide you "safety net" in times when cryptocurrency
market crashes.

If you would like to say thanks, drop me a message or I accept BTC on this address:
![15KENjj7UnrtvhsE3uA6QXXg5e2DwPFFKM](https://chart.googleapis.com/chart?cht=qr&chl=bitcoin%3A15KENjj7UnrtvhsE3uA6QXXg5e2DwPFFKM&choe=UTF-8&chs=300x300)
15KENjj7UnrtvhsE3uA6QXXg5e2DwPFFKM
