import nodemailer from 'nodemailer'

// configuation form ethreal 
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'floy.reynolds@ethereal.email',
        pass: '2wFVKvQaqTF4UghBHt'
    }
});

// config from nodemailer documnetation
export const sendMail = async (subject, htmlBody) => {
// subject and body passed from controller 
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: "test1@gmail.com",
        subject: subject,
        html: htmlBody,
      });
      console.log("Message sent:", info.messageId);
      
      
}
