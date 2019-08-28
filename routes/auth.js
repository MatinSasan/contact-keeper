const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

const postLoginValidator = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// @route   GET api/auth
// @desc    GET logged in user
// @access  Private

router.get('/', (req, res, next) => {
  res.send('Get logged in user');
});

// @route   POST api/auth
// @desc    Auth user and token
// @access  Public

router.post('/', postLoginValidator, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
        res.json(token);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
