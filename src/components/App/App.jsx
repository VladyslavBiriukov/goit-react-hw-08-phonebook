import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { ToastContainer } from 'react-toastify';
import css from './App.module.scss'


function App() { 
  return (
      <div className={css.section}>
        <section className={css.sectionBook} title="Phonebook">
        <h1 className={css.mainText}>Phonebook</h1>
          <ContactForm />
        </section>
      <section className={css.sectionContacts} title="Contacts">
          <h2 className={css.secondaryText}>Contacts</h2>
          <Filter  />
        <ContactList />
        <ToastContainer position="top-right" />
        </section>
      </div>
    );
};

export default App;

