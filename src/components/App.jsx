import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Phonebook/ContactForm';
import ContactsList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import s from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const checkContact = contacts.find(contact => contact.name === name);
    if (checkContact) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }
    setContacts(contacts => [...contacts, { id: nanoid(), name, number }]);
  };

  const filterContacts = filter => {
    setFilter(filter);
  };

  const getFilteredContacts = () => {
    const filterLower = filter.toLowerCase();
    return filter === ''
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filterLower)
        );
  };

  const removeContact = contactId => {
    // console.log(`remove contact: `, contactId);
    setContacts(contacts => {
      const deletedContacts = [...contacts];
      const index = deletedContacts.findIndex(
        contact => contact.id === contactId
      );
      deletedContacts.splice(index, 1);
      return deletedContacts;
    });
  };

  return (
    <div className={s.contentWrapper}>
      <section>
        <h2 className={s.title}>Phonebook</h2>
        <ContactForm onAddContact={addContact} />
      </section>
      <section>
        <h2 className={s.title}>Contacts</h2>
        <Filter onFilterChanged={filterContacts} />
        <ContactsList
          contacts={getFilteredContacts()}
          removeContact={removeContact}
        />
      </section>
    </div>
  );
};

export default App;
