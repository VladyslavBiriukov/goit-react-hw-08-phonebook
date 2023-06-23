import { useDispatch, useSelector } from 'react-redux'; 
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { nanoid } from 'nanoid'; 
import {  toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import css from './ContactForm.module.scss'
// import { Form, Input, Label, SubmitButton } from './ContactForm.styled';

function ContactForm () {
  const dispatch = useDispatch(); 
  const contacts = useSelector(selectContacts); 

  const handleSubmit = event => {
    event.preventDefault(); 

    const contact = {
      id: nanoid(),
      name: event.currentTarget.elements.name.value,
      phone: event.currentTarget.elements.number.value,
    };


    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      return toast.warn(`${contact.name} is already in contacts.`);
    }

    dispatch(addContact(contact)); 
    event.currentTarget.reset(); 
  };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label className={css.label} htmlFor={nanoid()}>
                Name
                <input
                    className={css.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    id={nanoid()}
                    required
                />
            </label>
            <label className={css.label} htmlFor={nanoid()}>
                Number
                <input
                    className={css.input}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    id={nanoid()}
                    required
                />
            </label>

            <button className={css.button} type="submit">Add contact</button>
        </form>
    );
};

export default ContactForm;