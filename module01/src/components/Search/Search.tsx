import { ChangeEvent, Component } from 'react';
import { ISearchProps, ISearchState } from '../../types/search';
import logoIMG from '../../assets/logo.webp';
import ErrorBtn from '../Error/ErrorBtn';
import './Search.css';

class Search extends Component<ISearchProps, ISearchState> {
  state: ISearchState = {
    value: '',
  };

  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      value: props.searchValue,
    };
  }

  handleSeacrh = (): void => {
    this.props.getData(this.state.value);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <header className="search">
        <img className="search__logo" src={logoIMG} alt="logo" />
        <div className="search__wrapp">
          <input
            className="search__input"
            type="text"
            placeholder="Search..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSeacrh}>Search 🔍</button>
        </div>
        <ErrorBtn />
      </header>
    );
  }
}

export default Search;
