const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// validator

const userValidator = [
  check('name', 'Please add a name')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 5 or more characters'
  ).isLength({ min: 5 })
];

// @route POST api/users/
// @desc Register a user
// @access Public

router.post('/', userValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send('passed');
});

module.exports = router;
