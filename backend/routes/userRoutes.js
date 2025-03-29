//routes/userRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/sendEmail');

//registration route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    //check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    
    user = new User({ name, email, password, role });
    await user.save();
    
    //create verification token
    const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    //send verification email
    await sendVerificationEmail(user, verificationToken);
    
    res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//email verification route
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: 'Invalid token' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Email verification failed' });
  }
});

//login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User does not exist' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email before logging in.' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    //create jwt token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
