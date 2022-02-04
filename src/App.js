import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import { FcDataRecovery } from 'react-icons/fc';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title } from './App.styled.js';
import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import ContactsList from './components/ContactsList/ContactsList';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, filterContact } from './redux/contactsSlice.js';
import { getContacts, getFilter } from './redux/selectors.js';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const normalizeName = contact.name.toLowerCase();
    if (contacts.some(item => item.name.toLowerCase() === normalizeName)) {
      return toast.info(`${contact.name} is already in your contacts`, {
        icon: <FcDataRecovery size="30px" />,
      });
    }
    dispatch(addItem(contact));
  };
  const handleFilter = e => dispatch(filterContact(e.currentTarget.value));
  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
  };
  const deleteContact = event => {
    dispatch(deleteItem(event.currentTarget.id));
  };
  return (
    <Container>
      <ToastContainer position="bottom-left" theme="colored" />
      <div>
        <Title>Phonebook</Title>
        <Form onChange={addContact} />
      </div>
      <Section name="Contacts">
        <Filter value={filter} onChange={handleFilter} />
        <ContactsList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
      </Section>
    </Container>
  );
}
