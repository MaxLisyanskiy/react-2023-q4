import { ChangeEvent, useContext, useState } from 'react';
import { SearchContext } from '../../context/search-context';
import { SearchContextType } from '../../types/context-types';
import ErrorBtn from '../Error/ErrorBtn';
import logoIMG from '../../assets/logo.png';
import classes from './Search.module.scss';

export interface SearchProps {
  onChangeSearch: () => void;
}

const Search = ({ onChangeSearch }: SearchProps) => {
  const { search, changeSearch } = useContext(
    SearchContext,
  ) as SearchContextType;

  const [value, setValue] = useState<string>(search);

  const handleSeacrh = () => {
    onChangeSearch();
    changeSearch(value);
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
