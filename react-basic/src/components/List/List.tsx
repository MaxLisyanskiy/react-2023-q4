import Pagination from '../Pagination/Pagination';
import { useContext, useEffect, useState } from 'react';
import { ICharacterResponse } from '../../types/characters';
import { Link } from 'react-router-dom';
import { generateLink } from '../../utils/generate-link';
import { API_URL, TOTAL_COUNT } from '../../utils/constants';
import { SearchContext } from '../../context/search-context';
import { CardsContextType, SearchContextType } from '../../types/context-types';
import Spinner from '../Spinner/Spinner';
import { CardsContext } from '../../context/cards-context';
import './List.scss';

export interface ListProps {
  currentPage: number;
  currentPageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const List = (props: ListProps) => {
  const { currentPage, currentPageSize, onPageChange, onPageSizeChange } =
    props;

  const { search } = useContext(SearchContext) as SearchContextType;
  const { cards, setCards } = useContext(CardsContext) as CardsContextType;

  const [currentTotalCount, setCurrentTotalCount] =
    useState<number>(TOTAL_COUNT);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getFetchData(search, currentPage, currentPageSize);
  }, [search, currentPage, currentPageSize]); // eslint-disable-line

  const getFetchData = async (
    search: string,
    page: number,
    pageSize: number,
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const response: Response = await fetch(
        search.trim() !== ''
          ? `${API_URL}?q=name:${search}&page=${page}&pageSize=${pageSize}`
          : `${API_URL}?page=${page}&pageSize=${pageSize}`,
      );

      if (response.status === 200) {
        const { data, totalCount }: ICharacterResponse = await response.json();

        setCurrentTotalCount(totalCount);
        setCards(data);
      } else {
        setCards([]);
      }
    } catch (error) {
      setCards([]);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="characters">
      <div className="characters__section">
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            {cards.length > 0 ? (
              <>
                <ul className="list">
                  {cards.map((item) => {
                    return (
                      <li className="item" key={item.id}>
                        <Link
                          to={generateLink(
                            currentPage,
                            currentPageSize,
                            search,
                            item.id,
                          )}
                        >
                          <div>
                            <img src={item.images.small} alt={item.name} />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Pagination
                  page={Number(currentPage)}
                  pageSize={Number(currentPageSize)}
                  totalCount={Number(currentTotalCount)}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              </>
            ) : (
              <div className="characters__not-found">
                <p>Opps... not found</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default List;
