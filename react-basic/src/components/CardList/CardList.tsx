import { pokemonAPI } from '../../services/fetchData';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { pageSlice } from '../../store/reducers/PageSlice';
import Spinner from '../Spinner/Spinner';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import notFoundDataIMG from '../../assets/psyduck.png';
import classes from './CardList.module.scss';
import { useEffect, useMemo } from 'react';

export interface CardListProps {
  currentPage: number;
  currentPageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const CardList = (props: CardListProps) => {
  const { currentPage, currentPageSize, onPageChange, onPageSizeChange } =
    props;

  const { query } = useAppSelector((state) => state.searchReducer);

  const dispatch = useAppDispatch();
  const { changeItems } = pageSlice.actions;

  const { data, isLoading, isSuccess } = pokemonAPI.useGetAllCardsQuery({
    search: query,
    page: currentPage,
    pageSize: currentPageSize,
  });

  const caracters = useMemo(
    () => (isSuccess ? data.data : []),
    [isSuccess, data],
  );
  const totalCount = isSuccess ? data.totalCount : 0;

  useEffect(() => {
    dispatch(changeItems(caracters));
  }, [caracters]); // eslint-disable-line

  return (
    <section className={classes.section}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {caracters.length > 0 ? (
            <>
              <ul className={classes.list} data-testid={'caracters'}>
                {caracters.map((item) => (
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
                totalCount={Number(totalCount)}
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
