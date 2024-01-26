import Search from './Search/Search';
import { Outlet } from 'react-router-dom';
import Characters from './Characters/Characters';
import { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <Search changeSearch={(value: string) => setSearch(value)} />
      <main className="main">
        <h1 className="main-title">Welcome to the Pokémon Home</h1>
        <div className="main-wrapp">
          <Characters search={search} />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
