const nodemailer = require("nodemailer");

async function sendRecoveryCode(receiverEmail, recoveryCode) {
  try {
    let from = "tauseefiqbal939@gmail.com"
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: from,
        pass: "pmxjkildeafplikn",
      },
    })
    await transporter.sendMail({
      from: from,
      to: receiverEmail,
      subject: "Password Recovery Email",
      html: recoveryCode,
    })
    return true
  } catch (error) {
    console.log('error in sending email', error)
    return false
  }
}

module.exports = sendRecoveryCode