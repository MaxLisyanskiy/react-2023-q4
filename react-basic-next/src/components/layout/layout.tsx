import { useRouter } from 'next/router';
import { gSSP } from '@/types/card-type';

import ErrorBoundary from '../Error/ErrorBoundary';
import Search from '../Search/Search';
import CardList from '../CardList/CardList';
import Pagination from '../Pagination/Pagination';
import DetailedCard from '../DetailedCard/DetailedCard';

import classes from './layout.module.scss';

const Layout = ({ cards, detailed }: gSSP) => {
  const router = useRouter();
  const { query } = router;
  const { page, pageSize } = query;

  return (
    <>
      <ErrorBoundary>
        <Search />
        <main className={classes.main}>
          <h1 className={classes.mainTitle}>Welcome to the Pokémon Home</h1>
          <div className={classes.mainWrapp}>
            <section className={classes.section}>
              <CardList data={cards.items} />
              <Pagination
                page={Number(page)}
                pageSize={Number(pageSize)}
                totalCount={Number(cards.totalCount)}
              />
            </section>
            {detailed && <DetailedCard data={detailed} />}
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default Layout;
