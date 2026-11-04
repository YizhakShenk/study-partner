


const transferMail = async (emailDestination, titleMessage, bodyMessage, htmlBody) => {
    try {
        console.log('CALLED BREVO MAILER');

        const recipients = (Array.isArray(emailDestination)
            ? emailDestination
            : String(emailDestination).split(/[,;]/)
        )
            .map(email => String(email).trim())
            .filter(Boolean)
            .map(email => ({ email }));

        if (recipients.length === 0) {
            throw new Error('No email recipients provided');
        }

        const payload = {
            sender: {
                name: 'Study Partner',
                email: process.env.EMAIL_URL
            },
            to: recipients,
            subject: titleMessage
        };

        if (bodyMessage) {
            payload.textContent = bodyMessage;
        }

        if (htmlBody) {
            payload.htmlContent = htmlBody;
        }

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }

        console.log('EMAIL SENT:', result.messageId);
        return 'email sent';
    }
    catch (err) {
        console.log('BREVO EMAIL ERROR:', err);
        return err;
    }
};

module.exports = {
    transferMail,
};

// const nodeMailer = require('nodemailer');

// const mailTransporter = nodeMailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_URL,
//         pass: process.env.EMAIL_PASS,
//     }
// });

// const transferMail = async (emailDestination, titleMessage, bodyMessage,htmlBody) => {
//     try {
//         console.log('CALLED MAILER');
//         const sent = await mailTransporter.sendMail(
//             {
//                 from: `"Study Partner" <${process.env.EMAIL_URL}>`,
//                 to: emailDestination, 
//                 subject: titleMessage,
//                 text: bodyMessage,
//                 html: htmlBody,
//             },
//         );
//         console.log(sent);
//             console.log("EMAIL SENT");
//             return 'email sent';
//     }
//     catch (err) {
//         console.log("err", err);
//         return err
//     }

// }

// module.exports = {
//     transferMail,
// }
