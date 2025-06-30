import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

router.post('/login', (req, res) => {

    const { email, password } = req.body;

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = getUser.get(email);

        if (!user) {
            console.error("User not found.");
            return res.status(404).json({ message: 'User Not found' });
        }

        const passwordIsValid = password === user.password;

        if (!passwordIsValid) { return res.status(401).json({ message: 'Invalid password' }); }

        //Send JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(503).json({ message: 'Server Error' });
    }

})

export default router