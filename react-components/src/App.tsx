import { Component } from 'react';
import Search from './components/Search/Search';
import './App.css';

type State = {
  search: string;
};

class App extends Component {
  state: State = {
    search: '',
  };

  getData = (value: string): void => {
    this.setState({ search: value });
  };

  render() {
    return (
      <div>
        <Search searchValue="" getData={this.getData} />
      </div>
    );
  }
}

export default App;
