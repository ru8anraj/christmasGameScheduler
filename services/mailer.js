const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    host: "smtp.gmail.com",
    auth: {
        user: 'rapidprototypesolutions@gmail.com',
        pass: 'Rapid@123'
    }
});

/* Promises to send mail */
function mailer() {
    // setup email data 
    let mailOptions = {
        from: 'rapidprototypesolutions@gmail.com', 
        to: 'ru8anraj@gmail.com', // list of receivers SPACE seperated value
        subject: 'Invitation to Christmas celebration by Rapid Prototyping Team', // Subject line
        text: 'We welcome you join our celebration', 
        html: '<b>Lets celebrate!</b>'
    };

  return new Promise((resolve, reject) => {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            reject('Error in sending mail -> '+ error);
        } else {
          resolve('Message sent: %s'+ info.messageId);
        }
    });
  });
}

module.exports = mailer;