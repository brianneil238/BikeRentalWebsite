const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'brianneil238@gmail.com',
    pass: 'oahpycsorhsggsnr'
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.sendMail({
  from: 'brianneil238@gmail.com',
  to: 'brianneil238@gmail.com',
  subject: 'Test',
  text: 'Hello from Node.js'
}, (err, info) => {
  if (err) {
    return console.log(err);
  }
  console.log('Message sent: %s', info.messageId);
});
