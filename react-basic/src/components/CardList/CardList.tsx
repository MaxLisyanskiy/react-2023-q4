import { pokemonAPI } from '../../services/fetchData';
import Spinner from '../Spinner/Spinner';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import notFoundDataIMG from '../../assets/psyduck.png';
import classes from './CardList.module.scss';
import { useAppSelector } from '../../store/redux-hooks';

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

  const { data, isLoading, isSuccess } = pokemonAPI.useGetAllCardsQuery({
    search: query,
    page: currentPage,
    pageSize: currentPageSize,
  });

  const caracters = isSuccess ? data.data : [];
  const totalCount = isSuccess ? data.totalCount : 0;

  return (
    <section className={classes.section}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {caracters.length > 0 ? (
            <>
              <ul className={classes.list}>
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
