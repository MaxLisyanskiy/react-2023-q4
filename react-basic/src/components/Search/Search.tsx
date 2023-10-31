import { ChangeEvent, useEffect, useState } from 'react';
import logoIMG from '../../assets/logo.webp';
import ErrorBtn from '../Error/ErrorBtn';
import './Search.css';

export type ISearchProps = {
  searchValue: string;
  getData: (value: string) => void;
};

const Search = ({ searchValue, getData }: ISearchProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (searchValue) setValue(searchValue);
  }, [searchValue]);

  const handleSeacrh = () => {
    getData(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <header className="search">
      <img className="search__logo" src={logoIMG} alt="logo" />
      <div className="search__wrapp">
        <input className="search__input" type="text" placeholder="Search..." value={value} onChange={handleChange} />
        <button onClick={handleSeacrh}>Search 🔍</button>
      </div>
      <ErrorBtn />
    </header>
  );
};

export default Search;
