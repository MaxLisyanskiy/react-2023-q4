import { ChangeEvent, Component } from 'react';
import { ISearchProps, ISearchState } from '../../types/search';

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
      <div>
        <input type="text" placeholder="Search..." value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleSeacrh}>Search 🔍</button>
      </div>
    );
  }
}

export default Search;
