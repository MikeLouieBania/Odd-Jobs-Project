// email.ts

/**
 * Module for sending verification emails using Nodemailer.
 */

const nodemailer = require("nodemailer");

const { GMAIL_EMAIL, GMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASSWORD,
    },
});

/**
 * Sends a verification email to the specified recipient.
 * @param {string} to - The recipient's email address.
 * @param {string} companyName - The name of the company.
 */

export async function sendEmailVerfication({
    to,
    companyName,
}: {
    to: string;
    companyName: string;
}) {

    try {
        const testResult = await transporter.verify();
        console.log(testResult);
    } catch (error) {
        console.error({ error });
        return;
    }

    const emailContent = `
        <p>Dear Marine,</p>
        <p>Welcome to ${companyName}!</p>
        <p>Your account is now active and you can start using our platform.</p> 
        <p>Thank you for joining us,</p>
        <p>The Management Team</p>
    `;
    
    try {
        const sendResult = await transporter.sendMail({
            from: GMAIL_EMAIL,
            to,
            subject: "Welcome to Our Platform",
            html: emailContent,
        });
        console.log(sendResult);
    } catch (error) {
        console.log(error);
    }
} 