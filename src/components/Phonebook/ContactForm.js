import React, { Fragment } from 'react';
import SubTitle from './subTitle.js';
import PropTypes from 'prop-types';
import styles from './Fponebook.module.css';


const ContactForm = ({
  name,
  number,
  onContactAdd,
  onChangeInput,
  onError,
}) => (
  <Fragment>
    <form onSubmit={onContactAdd} className={styles.Form}>
      <label>
        <SubTitle title="Name" />

        <input
          type="text"
          name="name"
          value={name}
          onChange={onChangeInput}
          placeholder="Type contact name..."
        />
        {onError && <span className={styles.error}>{onError.name}</span>}
      </label>
      <label>
        <SubTitle title="Number" />
        <input
          type="text"
          name="number"
          value={number}
          onChange={onChangeInput}
          placeholder="Type contact number..."
        />
        {onError && <span className={styles.error}>{onError.number}</span>}
      </label>

      <button
        type="submit"
        className={styles.button + ' ' + styles.buttonSubmit}
      >
        Add contact
      </button>
    </form>
  </Fragment>
);

export default ContactForm;

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onContactAdd: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onError: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
