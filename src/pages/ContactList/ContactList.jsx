import {
  Item,
  List,
  ButtonRedact,
  UserIcon,
  PhoneIcon,
  InputForm,
  ModalRedact,
  UserIconList,
  PhoneiconList,
  DivName,
  Spiner,
  Title,
  Container,
} from './ContactList.styled'; 

import { useDispatch, useSelector } from 'react-redux';

import {
  deleteContact,
  redactContatc,
  fetchContacts,
} from 'components/redux/Redux/Contacts/operations'; 

import { useEffect, useState } from 'react';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Button, Popconfirm } from 'antd'; 
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; 

export default function Contactlist() {
  const [subName, setSubName] = useState(''); // для редагування контакту
  const [subNumber, setSubNumber] = useState('');
  const [subId, setSubId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false); 
    dispatch(redactContatc({ id: subId, name: subName, number: subNumber })); 
  };

  const showModal = (name, number, id) => {
    setSubNumber(number);
    setSubName(name);
    setSubId(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false); 
  };

  useEffect(() => {
    dispatch(fetchContacts()); 
  }, [dispatch]);

  const { isLoading } = useSelector(state => state.contacts);
  const contacts = useSelector(state => state.contacts.items);
  const filterData = useSelector(state => state.filter).toLowerCase(); 

  const visibleContacts = contacts.filter(subscriber =>
    subscriber.name.toLowerCase().includes(filterData)
  );

    return (
        <section>
            <Container>
                <div>
                    {' '}
                    {contacts.length < 1 ? (
                        <Title>Add your first contact</Title>
                    ) : (
                        <Filter />
                    )}
                    <ContactForm />
                    {isLoading && <Spiner />}
                </div>
                <List>
                    {visibleContacts.map(({ id, name, number }) => (
                        <Item key={id}>
                            <DivName>
                                <UserIconList />
                                {name}:
                            </DivName>
                            <PhoneiconList /> {number}
                            <ButtonRedact
                                onClick={() => showModal(name, number, id)}
                                title="Edit contatc"
                            >
                                <EditOutlined />
                                Edit
                            </ButtonRedact>
                            <Popconfirm
                                title="Are you sure delete this task?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => dispatch(deleteContact(id))}
                            >
                                <Button title="delete contact" type="primary">
                                    <DeleteOutlined /> Delete
                                </Button>
                            </Popconfirm>
                        </Item>
                    ))}

                    <ModalRedact
                        title="Edit a contact"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <InputForm
                            prefix={<UserIcon />}
                            value={subName} 
                            onChange={e => {
                                setSubName(e.target.value);
                            }}
                        />
                        <InputForm
                            prefix={<PhoneIcon />}
                            value={subNumber}
                            onChange={e => {
                                setSubNumber(e.target.value);
                            }}
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        />
                    </ModalRedact>
                </List>
            </Container>
        </section>
    );
}
