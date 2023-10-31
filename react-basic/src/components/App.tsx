import { useEffect, useState } from 'react';
import Search from './Search/Search';
import Characters from './Characters/Characters';

const App = () => {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const ls: string | null = localStorage.getItem('rss_project_01_search');

    if (ls) setSearch(ls);
  }, []);

  const getData = (value: string) => {
    if (value !== search) {
      setSearch(value);
      localStorage.setItem('rss_project_01_search', value);
    }
  };

  return (
    <>
      <Search searchValue={search} getData={getData} />
      <Characters searchValue={search} />
    </>
  );
};

export default App;
