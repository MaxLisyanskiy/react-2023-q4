import { useContext, useEffect, useState } from 'react';
import { TOTAL_COUNT } from '../../utils/constants';
import { getAllCards } from '../../services/fetchData';
import { SearchContext } from '../../context/search-context';
import { CardsContextType, SearchContextType } from '../../types/context-types';
import { CardsContext } from '../../context/cards-context';
import Spinner from '../Spinner/Spinner';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import notFoundDataIMG from '../../assets/psyduck.png';
import classes from './CardList.module.scss';

export interface CardListProps {
  currentPage: number;
  currentPageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const CardList = (props: CardListProps) => {
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

    getAllCards(page, pageSize, search)
      .then(({ data, totalCount }) => {
        setCards(data);
        setCurrentTotalCount(totalCount);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={classes.section}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {cards.length > 0 ? (
            <>
              <ul className={classes.list}>
                {cards.map((item) => (
                  <Card
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    image={item.images.small}
                    currentPage={currentPage}
                    currentPageSize={currentPageSize}
                  />
                ))}
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
            <div className={classes.notFound}>
              <p data-testid={'cardsNotFound'}>Opps... not found</p>
              <img src={notFoundDataIMG} alt="not-found-pockemon" />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CardList;
