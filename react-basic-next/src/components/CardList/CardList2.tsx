import { pokemonAPI } from '../../services/fetchData';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
// import { pageSlice } from '../../store/reducers/PageSlice';
import Card from '../Card/Card';
// import Pagination from '../Pagination/Pagination';
import notFoundDataIMG from '../../assets/psyduck.png';
import classes from './CardList.module.scss';
import { useEffect, useMemo } from 'react';
import { ICard } from '@/types/card-type';

export interface CardListProps {
  data: ICard[];
  totalCount: number;
  currentPage: number;
  currentPageSize: number;
}

const CardList2 = (props: CardListProps) => {
  const { data, totalCount, currentPage, currentPageSize } = props;

  return (
    <section className={classes.section}>
      {data.length > 0 ? (
        <>
          <ul className={classes.list} data-testid={'caracters'}>
            {data.map((item) => (
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
          {/* <Pagination
            page={Number(currentPage)}
            pageSize={Number(currentPageSize)}
            totalCount={Number(totalCount)}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          /> */}
        </>
      ) : (
        <div className={classes.notFound}>
          <p data-testid={'cardsNotFound'}>Opps... not found</p>
          {/* <img src={notFoundDataIMG} alt="not-found-pockemon" /> */}
        </div>
      )}
    </section>
  );
};

export default CardList2;
