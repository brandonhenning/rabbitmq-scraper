const nodemailer = require('nodemailer')

// make this work with promises
function sendEmail (mailHTML, emailAddress) {
  return new Promise ((resolve, reject) => {
    nodemailer.createTestAccount((error, account) => {
      if (error) {
        reject(error);
      }
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PASS
          }
      })
      let mailOptions = {
          from: '<craigslistbot>',
          to: emailAddress,
          subject: 'Craigslist Emailer',
          html: mailHTML
      }
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              reject(error);
          }
          resolve();
      })
  })
  })

}


module.exports = {
    sendEmail,
}

