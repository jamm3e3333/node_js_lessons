const mail = require('nodemailer');

const transporter = mail.createTransport({
    service: "gmail",
    auth: {
        user: "nodemailer3333e3@gmail.com",
        pass: "V2t5kovice"
    }
});

const emailSend = (to, subject, text) => {
    transporter.sendMail({
        from: "nodemailer3333e3@gmail.com",
        to: to,
        subject: subject,
        text: text
    }, (err, info) => {
        if(err){
            return console.log(err);
        }
        console.log(`Sent: ${info.response}`)
    });
}

emailSend('jakub.valaa@seznam.cz','kar','ahoj vole jak to jde');