const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: 'rubanraj.r07@wipro.com',
        pass: ""
    }
});

/* Promises to send mail */
function mailer() {
    // setup email data 
    let mailOptions = {
        from: 'rubanraj.r07@wipro.com', 
        to: 'prateek.pandey2@wipro.com', // list of receivers SPACE seperated value
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

function getPass() {
    return "Rj@nov05";
}