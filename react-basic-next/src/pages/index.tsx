import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '@/store/store';
import Head from 'next/head';
import {
  getAllCards,
  getDetailedCard,
  getRunningQueriesThunk,
} from '@/services/fetchData';
import { PAGE, PAGE_SIZE } from '@/utils/constants';
import Search from '@/components/Search/Search';
import CardList from '@/components/CardList/CardList';
import DetailedCard from '@/components/DetailedCard/DetailedCard';
import { useRouter } from 'next/router';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { gSSP } from '@/types/card-type';
import Pagination from '@/components/Pagination/Pagination';

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
  const { page, pageSize, search, detailedId } = query;

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
              <CardList
                data={cards.items}
                totalCount={100}
                currentPage={cards.currentPage}
                currentPageSize={cards.currentPageSize}
              />
              <Pagination
                page={Number(page)}
                pageSize={Number(pageSize)}
                totalCount={Number(100)}
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
