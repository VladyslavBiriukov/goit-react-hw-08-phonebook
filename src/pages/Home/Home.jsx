import {
  Title,
  HomeUserGroup,
  Wrap,
  UnderTitle,
  HomeLink,
  Section,
  HomeEdit,
  HomePhoneIcon,
  HomeContactList,
} from './Home.styled'; 

import {ContainerOutlined} from '@ant-design/icons';

import { useSelector } from 'react-redux';

export default function Home() {
  const { isLoaggedIn } = useSelector(state => state.auth); 

  return (
    <Section>
      <Title>Wellcome to you PhoneBook <ContainerOutlined style={{color: '#3a97e8'}}/></Title>

      <Wrap>
        {' '}
        <HomeEdit /> <HomePhoneIcon />
        <HomeUserGroup />
        <HomeContactList />
      </Wrap>

      {!isLoaggedIn ? (
        <UnderTitle>
          Please
          <HomeLink to="/register">Register</HomeLink>
          or
          <HomeLink to="/login">Log in</HomeLink>
          to be able to use your PhoneBook
        </UnderTitle>
      ) : (
        <UnderTitle>
          Сlick onn
          <HomeLink to="/contacts">Contacts</HomeLink>
          and manage your contacts
        </UnderTitle>
      )}
    </Section>
  );
}