import React, { Fragment, Component } from 'react';
import shortid from 'shortid';
import styles from './Fponebook.module.css';
import PNotify from 'pnotify/dist/es/PNotify';
import 'material-design-icons/iconfont/material-icons.css';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';

import 'pnotify/dist/es/PNotifyButtons.js';
import ContactForm from './ContactForm.js';
import ContactList from './ContactList.js';
import Filter from './Filter';
import { validateAll } from 'indicative/validator';

PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

const rules = {
  name: 'required|alpha',
  number: 'required|number',
};

const messages = {
  alpha: 'Name must contain letters only!!',
  number: 'Phone must contain numeral only!!',
  'name.required': 'this field is required',
  'number.required': 'this field is required',
};

const nameFilter = (filter, contacts) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

const nameAlreadyExist = (name, contacts) => {
  return contacts.filter(
    contact => contact.name.toLowerCase() === name.toLowerCase(),
  );
};

export default class PhonebookForm extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
    errors: null,
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.resetError();
  };

  handleAdd = e => {
    e.preventDefault();

    const { name, number, contacts } = this.state;
    const nameExist = nameAlreadyExist(name, contacts);

    nameExist.length === 0
      ? validateAll({ name, number }, rules, messages)
        .then(data => {
          const itemToAdd = {
            name: this.state.name,
            number: this.state.number,
            id: shortid.generate(),
          };

          this.setState(state => ({
            contacts: [...state.contacts, itemToAdd],
          }));
          this.pnotifyOk();

          this.reset();
        })
        .catch(errors => {
          const formattedErrors = {};

          errors.forEach(error => {
            formattedErrors[error.field] = error.message;
          });
          this.setState({ errors: formattedErrors });
        })
      : this.pnotifyError();
  };
  reset = () => {
    this.setState(state => ({
      name: '',
      number: '',
    }));
  };

  resetError = () => {
    this.setState(state => ({
      errors: null,
    }));
  };

  pnotifyOk = () => {
    let notice = PNotify.success({
      addclass: styles.notice,
      text: 'New contact added',
      animateSpeed: 'slow',
      delay: 4000,
    });
    notice.on('click', function () {
      notice.close();
    });
  };

  pnotifyError = () => {
    let notice = PNotify.error({
      text: 'Such contact is already exist in your DB! Contact not added',
      animateSpeed: 'slow',
      delay: 4000,
    });
    notice.on('click', function () {
      notice.close();
    });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { name } = this.state;
    const { contacts } = this.state;
    const { number } = this.state;
    const { filter } = this.state;
    const { errors } = this.state;

    const nameFiltered = nameFilter(filter, contacts);

    /*     console.log(nameExist); */
    return (
      <Fragment>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          onContactAdd={this.handleAdd}
          onChangeInput={this.handleChange}
          onError={errors}
        />
        <h2>Contacts</h2>

        <Filter onChangeFilter={this.handleFilter} value={filter} />
        <ContactList
          contacts={nameFiltered}
          onDeleteContact={this.handleDelete}
        />
      </Fragment>
    );
  }
}
