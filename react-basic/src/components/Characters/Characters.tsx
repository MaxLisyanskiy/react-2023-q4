import { Component } from 'react';
import { ICharacterProps, ICharacterResponse, ICharacterState } from '../../types/characters';
import notFoundIMG from '../../assets/not-found.webp';
import './Characters.css';

const API_URL: string = 'https://rickandmortyapi.com/api/character';

class Characters extends Component<ICharacterProps, ICharacterState> {
  state: ICharacterState = {
    characters: [],
    loading: false,
  };

  constructor(props: ICharacterProps) {
    super(props);
  }

  componentDidUpdate(prevProps: ICharacterProps): void {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.getData(this.props.searchValue);
    }
  }

  componentDidMount(): void {
    this.getData(this.props.searchValue);
  }

  getData = async (searchValue: string): Promise<void> => {
    this.setState({ loading: true });

    try {
      const response: Response = await fetch(searchValue.trim() !== '' ? `${API_URL}?name=${searchValue}` : API_URL);

      if (response.status === 200) {
        const data: ICharacterResponse = await response.json();
        this.setState({ characters: data.results });
      } else {
        this.setState({ characters: [] });
      }
    } catch (error) {
      this.setState({ characters: [] });
      console.error('Error:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <main className="characters">
        <h1 className="characters__title">The Rick and Morty Characters</h1>

        <section className="characters__section">
          {this.state.loading ? (
            <div className="characters__loading">Loading...</div>
          ) : (
            <>
              {this.state.characters.length > 0 ? (
                <ul className="list">
                  {this.state.characters.map((item) => {
                    return (
                      <li className="item" key={item.id}>
                        <div>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item__wrapp">
                          <h2 className="item__title">{item.name}</h2>
                          <h4 className="item__subtitle">
                            {item.species} - {item.gender}
                          </h4>
                          <div className="item__additional">
                            <span>Last known location:</span>
                            <p>{item.location.name}</p>
                          </div>
                          <div className="item__additional">
                            <span>First seen in:</span>
                            <p>{item.origin.name}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="characters__not-found">
                  <p>Opps... not found</p>
                  <img src={notFoundIMG} alt="notFoundIMG" />
                </div>
              )}
            </>
          )}
        </section>
      </main>
    );
  }
}

export default Characters;
