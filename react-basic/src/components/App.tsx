import Search from './Search/Search';
import { Outlet } from 'react-router-dom';
import Characters from './Characters/Characters';

const App = () => {
  return (
    <>
      <Search />
      <main style={{ display: 'flex' }}>
        <h1 className="characters__title">Welcome to the Pokémon Home</h1>
        <div>
          <Characters />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
