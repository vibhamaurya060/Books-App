const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendEmail = (email, subject, text) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text
    });
};

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        user.otp = generateOTP();
        await user.save();
        await sendEmail(email, 'OTP Verification', `Your OTP is: ${user.otp}`);
        res.status(201).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email, otp });
        if (!user) return res.status(400).json({ message: 'Invalid OTP.' });
        user.isVerified = true;
        user.otp = null;
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await user.comparePassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first.' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.signout = (req, res) => {
    res.status(200).json({ message: 'Signed out successfully.' });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found.' });
        user.otp = generateOTP();
        await user.save();
        await sendEmail(email, 'Password Reset OTP', `Your OTP is: ${user.otp}`);
        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, otp });
        if (!user) return res.status(400).json({ message: 'Invalid OTP.' });
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
