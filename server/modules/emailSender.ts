import nodemailer from 'nodemailer';

interface EmailSenderProps {
  to: string;
  subject: string;
  html: string;
}

interface TransportObject {
  name: string;
}

const sendEmail = async (options: EmailSenderProps): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    name: process.env.EMAIL_SERVICE_NAME,
    host: process.env.EMAIL_SERVICE_HOST,
    port: process.env.EMAIL_SERVICE_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVICE_USERNAME,
      pass: process.env.EMAIL_SERVICE_PASSWORD,
    },
  } as TransportObject);

  const mailOptions = {
    from: process.env.EMAIL_SERVICE_SENDER_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  const isEmailSent = await transporter.sendMail(mailOptions);

  if (isEmailSent) {
    return true;
  }

  return false;
};

export default sendEmail;
