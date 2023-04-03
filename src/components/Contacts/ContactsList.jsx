import PropTypes from 'prop-types';
import s from '../Contacts/ContactList.module.css';

const ContactsList = ({ contacts, removeContact }) => {
  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li className={s.contactsListItem} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              type="button"
              className={s.contactsBtn}
              onClick={() => removeContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default ContactsList;
