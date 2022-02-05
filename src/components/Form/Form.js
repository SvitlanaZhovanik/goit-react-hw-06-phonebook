import { useState } from 'react';
import { FcBusinessContact, FcCallback } from 'react-icons/fc';
import { WrapperForm, Label, Input, ButtonForm } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { FcDataRecovery } from 'react-icons/fc';
import { addItem } from '../../redux/contacts/contactsSlice';
import { getContacts } from '../../redux/contacts/selectors';

export default function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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

  const handleSubmit = e => {
    e.preventDefault();
    addContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <Label>
        <FcBusinessContact style={{ verticalAlign: 'middle' }} size="27px" /> Name
        <Input
          type="text"
          name="name"
          value={name}
          onChange={evt => setName(evt.target.value)}
          placeholder="Enter your name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        <FcCallback style={{ verticalAlign: 'middle' }} size="27px" /> Phone
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={evt => setNumber(evt.target.value)}
          placeholder="Enter your number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <ButtonForm type="submit">Add contacts</ButtonForm>
    </WrapperForm>
  );
}
