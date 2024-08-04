import { User } from '../models/users.model.js';
import dotenv from 'dotenv';
import twilio from 'twilio';


dotenv.config(
    {
        path: './.env'
    }
);

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendSMS = async (req, res) => {
  try {
    // Fetch users from the database
    const users = await User.find();
    
    // Send SMS to all users
    for (const user of users) {
      await client.messages.create({
        body: 'Emergency Alert: Please take immediate action.',
        from: process.env.TWILIO_NUMBER,
        to: user.phoneNumber
      });
    }
    
    res.status(200).json({ message: 'SMS sent to all users.' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send SMS.' });
  }
};

export { sendSMS };
