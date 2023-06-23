import { setFilter } from 'redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux'; 
import { selectFilter } from 'redux/selectors';
import css from './Filter.module.scss'

function Filter() {
  const dispatch = useDispatch(); 
  const filter = useSelector(selectFilter); 

    return (
        <label className={css.label}>
            Find contacts by name
            <input
                className={css.input}
                type="text"
                value={filter}
                onChange={event => dispatch(setFilter(event.target.value.trim()))}
            />
        </label>
    );
};

export default Filter;