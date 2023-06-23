// import { setFilter } from 'Redux/Contacts/filterSlice';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { selectFilter } from 'Redux/selectors';
// import css from './Filter.module.scss'

// function Filter() {
//   const dispatch = useDispatch(); 
//   const filter = useSelector(selectFilter); 

//     return (
//         <label className={css.label}>
//             Find contacts by name
//             <input
//                 className={css.input}
//                 type="text"
//                 value={filter}
//                 onChange={event => dispatch(setFilter(event.target.value.trim()))}
//             />
//         </label>
//     );
// };

// export default Filter;


import { WrapperFiler, FilterInput, FilterP } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filtration } from 'Redux/Contacts/filterSlice';
import { SearchOutlined } from '@ant-design/icons';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter); // масив контактів

  return (
    <WrapperFiler>
      <FilterP>Find contacts by name</FilterP>

      <FilterInput
        prefix={<SearchOutlined />} // іконка
        type="text"
        value={filter}
        onChange={e => dispatch(filtration(e.target.value))} // фільтруємо контакти
      />
    </WrapperFiler>
  );
};
