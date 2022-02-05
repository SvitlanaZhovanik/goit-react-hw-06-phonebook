import { List } from './ContactsList.styled';
import ContactItem from './ContactItem/ContactItem';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from '../../redux/contacts/selectors';
import { deleteItem } from '../../redux/contacts/contactsSlice';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
  };
  const contactsNormalize = getVisibleContacts();
  const deleteContact = event => {
    dispatch(deleteItem(event.currentTarget.id));
  };
  return (
    <List>
      {contactsNormalize.map(({ id, name, number }) => {
        return <ContactItem onClick={deleteContact} key={id} id={id} name={name} number={number} />;
      })}
    </List>
  );
};

export default ContactsList;
