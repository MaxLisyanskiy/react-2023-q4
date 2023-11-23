import { GetServerSideProps, NextPage } from 'next';
import { wrapper } from '@/store/store';
import Head from 'next/head';
import {
  getAllCards,
  getDetailedCard,
  getRunningQueriesThunk,
} from '@/services/fetchData';
import { PAGE, PAGE_SIZE } from '@/utils/constants';
import Search from '@/components/Search/Search';
import CardList2 from '@/components/CardList/CardList2';
import DetailedCard2 from '@/components/DetailedCard/DetailedCard2';

export const getServerSideProps: GetServerSideProps<{ data }> =
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

const HomePage: NextPage = ({ data }) => {
  const { cards, detailed } = data;

  return (
    <>
      <Head>
        <title>REACT2023Q4 | MaxLisyanskiy</title>
      </Head>
      <>
        <Search />
        <main className="main">
          <h1 className="main-title">Welcome to the Pokémon Home</h1>
          <div className="main-wrapp">
            <CardList2
              data={cards.items}
              currentPage={cards.currentPage}
              currentPageSize={cards.currentPageSize}
            />
            {detailed && <DetailedCard2 data={detailed} />}
          </div>
        </main>
      </>
    </>
  );
};

export default HomePage;
