const nodemailer = require('nodemailer')


function sendEmail (mailHTML, emailAddress) {
    nodemailer.createTestAccount((error, account) => {
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
                return console.log(error)
            }
        })
    })
}


module.exports = {
    sendEmail,
}

