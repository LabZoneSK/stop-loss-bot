/* Load .env variables to process.env */
require('dotenv').config();

const email = require('./notifications/email');

email.sendEmail({
  to: 'martin.starosta83@gmail.com',
  subject: 'Subject is something',
  html: '<p>Your HTML goes here.</p>',
});
