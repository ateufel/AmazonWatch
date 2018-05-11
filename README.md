# AmazonWatch
Watches Amazon articles for availability and orders them.

## Usage

* Clone or download the repository - on some server or Raspberry Pi
* Install packages: `yarn install` or `npm install`
* Set Environment Variables with your Amazon credentials: AW_EMAIL / AW_PASSWORD
* Start the server with the Amazon Article URL: `node index https://www.amazon....`
* Wait...

You can also use pm2 instead, of course: `pm2 start index`

## TODO

* send message or email on success? (not sure if neccessary, you get an order email anyway)
