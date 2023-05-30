import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ContactList.module.css';

export class ContactList extends Component {
  render() {
    const { contacts, filter, contactRemove } = this.props;

    const filterIDArray = filter => {
      if (filter !== '' || filter !== undefined) {
        const filterIDArray = filter.split(', ');
        return filterIDArray;
      }
    };

    if (filter === '') {
      return (
        <ul>
          {contacts.map(contact => (
            <li className={css.listItem} key={contact.id}>
              {contact.name}: {contact.number}{' '}
              <button type="button" id={contact.id} onClick={contactRemove}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      );
    } else if (filterIDArray(filter) !== ['']) {
      return (
        <ul>
          {contacts.map(contact =>
            filterIDArray(filter).includes(contact.id) ? (
              <li className={css.listItem} key={contact.id}>
                {contact.name}: {contact.number}{' '}
                <button type="button" id={contact.id} onClick={contactRemove}>
                  Delete
                </button>
              </li>
            ) : null
          )}
        </ul>
      );
    }
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
