import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Fponebook.module.css';

const ContactList = ({ contacts = [], onDeleteContact }) => (
  <Fragment>
    <ul>
      {contacts.map(item => (
        <li key={item.id}>
          {item.name + ': ' + item.number}

          {
            <button
              type="button"
              name="delte"
              onClick={() => onDeleteContact(item.id)}
              className={styles.button + ' ' + styles.buttonDelete}
            >
              delete
            </button>
          }
        </li>
      ))}
    </ul>
  </Fragment>
);

export default ContactList;

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
