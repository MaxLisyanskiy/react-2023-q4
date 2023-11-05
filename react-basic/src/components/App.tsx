import Search from './Search/Search';
import { Outlet } from 'react-router-dom';
import Characters from './Characters/Characters';

const App = () => {
  return (
    <>
      <Search />
      <main style={{ display: 'flex' }}>
        <Characters />
        <Outlet />
      </main>
    </>
  );
};

export default App;
