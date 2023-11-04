import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECT_PATH } from '../../constants';
import ErrorBtn from '../Error/ErrorBtn';
import logoIMG from '../../assets/logo.webp';
import './Search.css';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const ls: string | null = localStorage.getItem('rss_project_01_search');

    if (ls) setValue(ls);
  }, []);

  const handleSeacrh = () => {
    navigate(`${PROJECT_PATH}?search=${value}&page=1&limit=10`);
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
