import { createTransport } from 'nodemailer';
import { env } from './env.config';

// Creating a Nodemailer transporter instance to handle email sending
export const transporter = createTransport({
  host: env.SMTP_HOST, // SMTP server host
  secure: true, // Use SSL (true for port 465), ensuring the connection is encrypted
  port: 465, // SMTP port for secure connections, 465 is the default for SSL
  auth: {
    user: env.SMTP_USER, // SMTP username
    pass: env.SMTP_PASS, // SMTP password
  },
  tls: {
    rejectUnauthorized: true, // Disable strict SSL certificate validation
    // This can be useful if the server has a self-signed certificate,
    // but it can make the connection less secure, so use cautiously.
  },
});
