import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'mat',
        email: 'lol@land.com',
        phone: '111-111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'lat',
        email: 'lol1@land.com',
        phone: '211-111',
        type: 'personal'
      },
      {
        id: 3,
        name: 'rat',
        email: 'lol2@land.com',
        phone: '311-111',
        type: 'professional'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete contact

  // Set current contact

  // Clear current contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
