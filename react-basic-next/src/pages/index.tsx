import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '@/store/store';
import Head from 'next/head';
import {
  getAllCards,
  getDetailedCard,
  getRunningQueriesThunk,
} from '@/services/fetchData';
import { PAGE, PAGE_SIZE } from '@/utils/constants';
import { useRouter } from 'next/router';
import { gSSP } from '@/types/card-type';

import ErrorBoundary from '@/components/Error/ErrorBoundary';
import Search from '@/components/Search/Search';
import CardList from '@/components/CardList/CardList';
import Pagination from '@/components/Pagination/Pagination';
import DetailedCard from '@/components/DetailedCard/DetailedCard';

export const getServerSideProps: GetServerSideProps<{ data: gSSP }> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { page, pageSize, search, detailedId } = context.query;

    store.dispatch(
      getAllCards.initiate({
        page: page ? +page : PAGE,
        pageSize: pageSize ? +pageSize : PAGE_SIZE,
        search: search?.toString() || '',
      }),
    );

    if (detailedId) store.dispatch(getDetailedCard.initiate(detailedId));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data: {
          cards: store.getState().cardsReducer,
          detailed: store.getState().detailedReducer.item,
        },
      },
    };
  });

const HomePage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { cards, detailed } = data;

  const router = useRouter();
  const { query } = router;
  const { page, pageSize, detailedId } = query;

  return (
    <>
      <Head>
        <title>REACT2023Q4 | MaxLisyanskiy</title>
      </Head>
      <ErrorBoundary>
        <Search />
        <main className="main">
          <h1 className="main-title">Welcome to the Pokémon Home</h1>
          <div className="main-wrapp">
            <section>
              <CardList data={cards.items} />
              <Pagination
                page={Number(page)}
                pageSize={Number(pageSize)}
                totalCount={Number(cards.totalCount)}
              />
            </section>
            {detailedId && <DetailedCard data={detailed} />}
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
