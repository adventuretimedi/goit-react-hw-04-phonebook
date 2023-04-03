import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Phonebook/ContactForm';
import ContactsList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // збережи в локал, якщо відбулися зміни, componentDidUpdate -слідкує за змінами
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  // сходи в локал, якщо там щось є - запиши значення в стейт

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts && this.setState({ contacts: contacts });
  }

  addContact = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };

  filterContacts = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterLower = filter.toLowerCase();
    return filter === ''
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filterLower)
        );
  };

  removeContact = contactId => {
    // console.log(`remove contact: `, contactId);
    this.setState(prevState => {
      const deletedContacts = [...prevState.contacts];
      const index = deletedContacts.findIndex(
        contact => contact.id === contactId
      );
      deletedContacts.splice(index, 1);
      return { contacts: deletedContacts };
    });
  };

  render() {
    return (
      <div style={{ padding: '15px' }}>
        <section>
          <h2 className={s.title}>Phonebook</h2>
          <ContactForm onAddContact={this.addContact} />
        </section>
        <section>
          <h2 className={s.title}>Contacts</h2>
          <Filter onFilterChanged={this.filterContacts} />
          <ContactsList
            contacts={this.getFilteredContacts()}
            removeContact={this.removeContact}
          />
        </section>
      </div>
    );
  }
}

export default App;
