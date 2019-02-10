const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS
    }
  });

module.exports = {
    sendMail (email, option) {
        var mailOptions = {
            from: 'ciamailervene@gmail.com',
            to: email,
            subject: 'Schedos',
            html: `
               <h1> Someone ${option} you to a project </h1>
                <p> Please check out your schedos app! </p>
                <br>
                <p> Thank you. </p> 
                
            `
        }

        transporter.sendMail(mailOptions, function (error, info){
            if (error) {
              console.log(error);
            } else {
                done()
              console.log('Email sent: ' + info.response);
            }
        })

    }
}