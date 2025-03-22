const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secret, options } = require('../config/jwt');

const generateToken = (userId) => {
  return jwt.sign({ userId }, secret, options);
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('Registration attempt for:', email);

    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (password will be hashed by the pre-save hook)
    const user = new User({
      email: email.toLowerCase(),
      password, // No manual hashing needed
      name,
      avatar: 'default-avatar.png',
      rating: { average: 0, count: 0 },
      favorites: [],
      listings: [],
      role: 'user'
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Validate input
    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: !!password });
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password using the model's method
    const isValid = await user.comparePassword(password);
    console.log('Password validation:', { email, isValid });

    if (!isValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log('Login successful:', { email, userId: user._id });

    // Set token in response header
    res.header('Authorization', `Bearer ${token}`);
    
    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const validate = async (req, res) => {
  try {
    // User is already attached to req by the auth middleware
    const user = req.user;
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ message: 'Error validating token' });
  }
};

const logout = async (req, res) => {
  // JWT tokens are stateless, so we just return success
  // The client will remove the token
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  validate,
  logout,
}; 