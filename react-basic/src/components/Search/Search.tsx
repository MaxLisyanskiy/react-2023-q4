import { ChangeEvent, useState } from 'react';
import ErrorBtn from '../Error/ErrorBtn';
import logoIMG from '../../assets/logo.png';
import classes from './Search.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { searchSlice } from '../../store/reducers/SearchSlice';

export interface SearchProps {
  onChangeSearch: () => void;
}

const Search = ({ onChangeSearch }: SearchProps) => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.searchReducer);
  const { changeSearch } = searchSlice.actions;

  const [value, setValue] = useState<string>(query);

  const handleSeacrh = () => {
    onChangeSearch();
    dispatch(changeSearch(value));
    localStorage.setItem('rss_react_basic', value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header className={classes.search}>
      <img className={classes.logo} src={logoIMG} alt="logo" />
      <div className={classes.wrapp}>
        <input
          className={classes.input}
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          data-testid={'searchInput'}
        />
        <button onClick={handleSeacrh} data-testid={'searchBtn'}>
          Search 🔍
        </button>
      </div>
      <ErrorBtn />
    </header>
  );
};

export default Search;
