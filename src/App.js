import { Container, Title } from './App.styled.js';
import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import { ToastContainer } from 'react-toastify';
import ContactsList from './components/ContactsList/ContactsList';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Container>
      <ToastContainer position="bottom-left" theme="colored" />
      <div>
        <Title>Phonebook</Title>
        <Form />
      </div>
      <Section name="Contacts">
        <Filter />
        <ContactsList />
      </Section>
    </Container>
  );
}
