import { ChangeEvent, useContext, useState } from 'react';
import ErrorBtn from '../Error/ErrorBtn';
import logoIMG from '../../assets/logo.png';
import { SearchContext } from '../../context/search-context';
import { SearchContextType } from '../../types/context-types';
import './Search.scss';

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
    localStorage.setItem('rss_project_01_search', value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header className="search">
      <img className="search__logo" src={logoIMG} alt="logo" />
      <div className="search__wrapp">
        <input
          className="search__input"
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
        />
        <button onClick={handleSeacrh}>Search 🔍</button>
      </div>
      <ErrorBtn />
    </header>
  );
};

export default Search;
