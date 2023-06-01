import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { nanoid } from 'nanoid';

import css from './App.module.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let isContactExist;
    const form = e.currentTarget;
    const name = form.name.value;
    const number = form.number.value;

    this.state.contacts.forEach(contact => {
      if (contact.name === e.target[0].value) {
        isContactExist = true;
        return alert(`${name} is already in contacts.`);
      }
    });

    if (isContactExist) {
      return null;
    }

    this.setState(prevState =>
      prevState.contacts.push({
        id: nanoid(),
        name: name,
        number: number,
      })
    );
    form.reset();
  };

  filter = e => {
    e.preventDefault();
    const filterValue = e.target.value;

    return this.searchContacts(filterValue);
  };

  searchContacts = filterValue => {
    this.setState({ filter: '' });

    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase().includes(filterValue)) {
        return this.setState(prevState => {
          if (prevState.filter === '') {
            prevState.filter = contact.id;
          } else {
            prevState.filter = contact.id + ', ' + prevState.filter;
          }
        });
      }
    });
  };

  contactRemove = e => {
    e.preventDefault();

    this.state.contacts.forEach((contact, index) => {
      if (contact.id === e.target.id) {
        this.setState(this.state.contacts.splice(index, 1));
      }
    });
  };

  render() {
    return (
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter onFilterChange={this.filter} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onContactRemove={this.contactRemove}
        />
      </div>
    );
  }
}
