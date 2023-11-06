import Pagination from '../Pagination/Pagination';
import { useContext, useEffect, useState } from 'react';
import { ICharacter, ICharacterResponse } from '../../types/characters';
import { Link } from 'react-router-dom';
import { generateLink } from '../../utils/generate-link';
import { API_URL, TOTAL_COUNT } from '../../utils/constants';
import { SearchContext } from '../../context/search-context';
import { SearchContextType } from '../../types/context-types';
import './List.scss';
import Spinner from '../Spinner/Spinner';

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

  const [currentTotalCount, setCurrentTotalCount] =
    useState<number>(TOTAL_COUNT);

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getFetchData(search, currentPage, currentPageSize);
  }, [search, currentPage, currentPageSize]);

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
        setCharacters(data);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      setCharacters([]);
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
            {characters.length > 0 ? (
              <>
                <ul className="list">
                  {characters.map((item) => {
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
