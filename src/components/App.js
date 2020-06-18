import React, { Component } from 'react';
import Fonebook from './Phonebook/Phonebook.js';
import styles from './Phonebook/Fponebook.module.css';
/* import Contacts from './Phonebook/Contacts.js'; */

export default class App extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Fonebook />
        {/* <Contacts contacts={this.state.contacts} /> */}
      </div>
    );
  }
}
