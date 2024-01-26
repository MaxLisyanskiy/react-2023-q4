import { ChangeEvent, useEffect, useState } from 'react';
import ErrorBtn from '../Error/ErrorBtn';
import logoIMG from '../../assets/logo.png';
import './Search.scss';

interface Props {
  changeSearch: (value: string) => void;
}

const Search = (props: Props) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const ls: string | null = localStorage.getItem('rss_project_01_search');
    if (ls) setValue(ls);
  }, []);

  const handleSeacrh = () => {
    props.changeSearch(value);
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
