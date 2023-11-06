import Search from './Search/Search';
import { Outlet } from 'react-router-dom';
import Characters from './Characters/Characters';

const App = () => {
  return (
    <>
      <Search />
      <main className="main">
        <h1 className="main-title">Welcome to the Pokémon Home</h1>
        <div className="main-wrapp">
          <Characters />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
