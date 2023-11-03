import Search from './Search/Search';
import { Outlet } from 'react-router-dom';
import Characters from './Characters/Characters';

const App = () => {
  return (
    <>
      <Search />
      <main>
        <Characters />
        <Outlet />
      </main>
    </>
  );
};

export default App;
