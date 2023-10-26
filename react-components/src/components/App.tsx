import { Component } from 'react';
import Search from './Search/Search';
import Characters from './Characters/Characters';

type AppProps = {
  children?: JSX.Element;
};

type AppState = {
  search: string;
};

class App extends Component<AppProps, AppState> {
  state: AppState = {
    search: '',
  };

  constructor(props: AppProps) {
    super(props);

    const ls: string | null = localStorage.getItem('rss_project_01_search');
    this.state = {
      search: ls || '',
    };
  }

  getData = (value: string): void => {
    if (value !== this.state.search) {
      this.setState({ search: value });
      localStorage.setItem('rss_project_01_search', value);
    }
  };

  render() {
    return (
      <>
        <Search searchValue={this.state.search} getData={this.getData} />
        <Characters searchValue={this.state.search} getData={this.getData} />
      </>
    );
  }
}

export default App;
