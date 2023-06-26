import { WrapperFiler, FilterInput, FilterP } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filtration } from 'components/redux/Redux/Contacts/filterSlice';
import { SearchOutlined } from '@ant-design/icons';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter); 

  return (
    <WrapperFiler>
      <FilterP>Find contacts by name</FilterP>

      <FilterInput
        prefix={<SearchOutlined />} 
        type="text"
        value={filter}
        onChange={e => dispatch(filtration(e.target.value))} 
      />
    </WrapperFiler>
  );
};
