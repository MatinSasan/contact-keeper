const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

// utils
const {
  contactValidator,
  validationErrorHandler
} = require('../utils/validator');
const errorHandler = require('../utils/errorHandler');

// @route GET api/contacts
// @desc GET all user's contacts
// @access private

router.get('/', auth, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    errorHandler(err, res);
  }
});

// @route POST api/contacts
// @desc Add new contacts
// @access Private

router.post('/', [auth, contactValidator], async (req, res, next) => {
  validationErrorHandler(req, res);

  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    errorHandler(err, res);
  }
});

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private

router.put('/:id', (req, res, next) => {
  res.send('Update contact');
});

// @route DELETE api/contacts/:id
// @desc DELETE contact
// @access Private

router.delete('/:id', (req, res, next) => {
  res.send('Delete contact');
});

module.exports = router;
