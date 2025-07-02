import express from 'express';
import db from '../db.js';
import nodemailer from 'nodemailer';

const router = express.Router();


function generateRandom6DigitOTP() {
    // Generate a random integer between 100000 (inclusive) and 999999 (inclusive)
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return String(randomNumber);
}

async function sendEmail(mailOptions) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'divyanshumahi4@gmail.com',
            pass: process.env.GOOGLE_APP_PASSWORD,
        }
    });

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info.response)
    } catch (error) {
        console.error("Error sending email:", error);
    }
}


router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = getUser.get(email);
        console.log(user);

        if (!user) {
            console.error("User not found.");
            return res.status(404).json({ message: 'User Not found' });
        }

        const generatedOTP = generateRandom6DigitOTP();
        const expires = Date.now() + 15 * 60 * 1000;

        const updatedDB = db.prepare('UPDATE users SET otp = ?, otp_expires = ? WHERE email = ?;');
        updatedDB.run(generatedOTP, expires, email);

        console.log("OTP Sent:", generatedOTP);

        await sendEmail({
            from: 'divyanshumahi4@gmail.com',
            to: email,
            subject: 'TEST',
            text: 'OTP: ' + generatedOTP,
        });

        res.status(201).json({ message: 'OTP sent to email' });

    } catch (err) {
        console.log(err.message);
        res.status(503).json({ message: "Server Error" });
    }
})


router.put('/reset-password', (req, res) => {
    const { email, otp, resetPass } = req.body;
    console.log(req.body);
    console.log(email, otp, resetPass);


    try {
        const getUser = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = getUser.get(email);

        if (!user || user.otp !== otp || !user.otp_expires || user.otp_expires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const updatedDB = db.prepare('UPDATE users SET password = ?, otp = NULL, otp_expires = NULL WHERE email = ?;');
        updatedDB.run(resetPass, email);

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (err) {
        console.log(err.message);
        res.status(503).json({ message: "Server Error" });
    }
});


export default router