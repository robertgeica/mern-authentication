import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSms = async (to: string, messageText: string): Promise<any> => {
  try {
    const message = await client.messages.create({
      body: messageText,
      from: twilioPhoneNumber,
      to,
    });
    console.log(`SMS sent to ${to}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Error sending SMS to ${to}: ${error}`);
    throw error;
  }
};

export default sendSms;
