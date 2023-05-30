import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { nanoid } from 'nanoid';

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
    let contactExist = false;

    this.state.contacts.forEach(contact => {
      if (contact.name === e.target[0].value) {
        contactExist = true;
        return alert(`${e.target[0].value} is already in contacts.`);
      }
    });

    if (contactExist) {
      return;
    } else {
      const newContact = {
        id: nanoid(),
        name: e.target[0].value,
        number: e.target[1].value,
      };

      this.setState(prevState => prevState.contacts.push(newContact));
      e.target[0].value = '';
      e.target[1].value = '';
    }
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
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter handleChange={this.filter} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          contactRemove={this.contactRemove}
        />
      </div>
    );
  }
}
