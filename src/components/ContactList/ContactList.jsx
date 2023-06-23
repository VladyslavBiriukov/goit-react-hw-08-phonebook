import { useDispatch, useSelector } from 'react-redux'; 
import { useEffect } from 'react';
import { GrContactInfo } from 'react-icons/gr';
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations'; 
import { PacmanLoader } from 'react-spinners';
import css from './ContactList.module.scss';


function ContactList()  {
  const filteredContacts = useSelector(selectFilteredContacts); 
  const isLoading = useSelector(selectIsLoading); 
  const error = useSelector(selectError); 
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

    return (
        <>
            {/* якщо немає контактів і не йде загрузка і не виникла помилка */}
            {!filteredContacts?.length && !error && !isLoading && (
                <p className={css.sorry}>No contacts found.</p>
            )}

            {/* якщо виникла помилка */}
            {error && <p className={css.text}>{error}</p>}
            <ul className={css.list}>

                {isLoading && <PacmanLoader
                    color="#424242"
                    cssOverride={{
                        position: 'absolute',
                        top: '50%',
                        left: '45%',
                        height: 20,
                        width: 0,
                        transform: 'translate(-50%, -50%)',
                    }} />}

                {/* Перебираємо масив контактів і рендеримо їх */}
                {filteredContacts.map(({ id, name, phone }) => (
                    <li className={css.item} key={id}>
                        <GrContactInfo size={20} />
                        <p className={css.text}>
                            {name}: {phone}
                        </p>
                        <button className={css.button} type="button" onClick={() => onDeleteContact(id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ContactList;