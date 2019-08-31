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

router.put('/:id', auth, async (req, res, next) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ mesg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ mesg: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    errorHandler(err, res);
  }
});

// @route DELETE api/contacts/:id
// @desc DELETE contact
// @access Private

router.delete('/:id', auth, async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found.' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    errorHandler(err, res);
  }
});

module.exports = router;
