const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'contact@steamandIrongame.com',
        subject: 'Welcome to Task manager!',
        text: `Welcome to the application ${name}. Let us know if you like it.`
    })
}

module.exports = {
    sendWelcomeEmail
}