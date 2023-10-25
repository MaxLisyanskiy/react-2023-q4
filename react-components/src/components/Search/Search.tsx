import { ChangeEvent, Component } from 'react';

type Props = {
  searchValue: string;
  getData: (value: string) => void;
};

type State = {
  value: string;
};

class Search extends Component<Props, State> {
  state: State = {
    value: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
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
