const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // email provider ymail, gmail, yahoo, hotmail, etc
  auth: {
    user: 'your-email@gmail.com', // up to u
    pass: 'your-email-password' // up to u
  }
});

function sendWelcomeEmail(userEmail) {
  const mailOptions = {
    from: 'your-email@gmail.com', // bakery email
    to: userEmail,
    subject: 'Welcome to Our Family', // up to u 
    text: `Thank you for registering with us! ` // welcome text up to u
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = { sendWelcomeEmail };
