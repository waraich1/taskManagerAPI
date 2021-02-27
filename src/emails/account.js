const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "harrykwar@gmail.com",
    subject: "This is my first creation",
    text: "I hope this one gets to you "
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "harrykwar@gmail.com",
    subject: "abb mein chalta hu",
    text: "This email got deleted"
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
