const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const auth = require('../middleware/auth');

// utils
const {
  postLoginValidator,
  validationErrorHandler
} = require('../utils/validator');
const errorHandler = require('../utils/errorHandler');

// @route   GET api/auth
// @desc    GET logged in user
// @access  Private

router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
});

// @route   POST api/auth
// @desc    Auth user and token
// @access  Public

router.post('/', postLoginValidator, async (req, res, next) => {
  validationErrorHandler(req, res);

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    errorHandler(err, res);
  }
});

module.exports = router;
