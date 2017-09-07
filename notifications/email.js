const nodemailer = require('nodemailer');

const smtpConfig = {
  host: process.env.SMTPHost,
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTPUser,
    pass: process.env.SMTPPass
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

const sendEmail = (options) => {
  const mailOptions = Object.assign({}, {
    from: 'bot@labzone.sk',
  }, options);

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info;
    }
  });
};

module.exports = {
  sendEmail,
};
