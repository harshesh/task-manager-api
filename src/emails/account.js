const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'harshkamli@gmail.com',
        subject: 'Thanks for joining In',
        text: `Welcome to tha app, ${name}. Let me know how you get along with the app`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'harshkamli@gmail.com',
        subject: 'Why are you removing your account?',
        text: `Hope you enjoy your time here , ${name}. Let me know how you get along with the app`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}