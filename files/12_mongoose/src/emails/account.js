const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);
sgMail.send({
    to: 'jakub.valaa@seznam.cz',
    from: 'jakub.valaa@seznam.cz',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})