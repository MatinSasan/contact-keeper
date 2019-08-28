const { check, validationResult } = require('express-validator');

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

const contactValidator = [
  check('name', 'Name is required')
    .not()
    .isEmpty()
];

const postLoginValidator = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

const validationErrorHandler = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {
  userValidator,
  contactValidator,
  postLoginValidator,
  validationErrorHandler
};
