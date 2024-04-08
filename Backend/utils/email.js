const nodemailer = require('nodemailer');

const sendMail = async options => {
  try{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  
    const mailOptions = {
      from: 'townguardd@gmail.com',
      to: options.to,
      subject: options.subject,
      text: options.text
    };
  
    await transporter.sendMail(mailOptions);
    // console.log('Email sent Successfully !');
  }catch(err)
  {
    console.error('Error sending email:', error);
    
  }
  
};

module.exports = sendMail;
// rmfElLOTxnkpj8u4HSyvJ43VJbOkcoW8
