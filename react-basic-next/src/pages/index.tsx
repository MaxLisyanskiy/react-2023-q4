import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '@/store/store';
import { getAllCards, getRunningQueriesThunk } from '@/services/fetchData';
import { PAGE, PAGE_SIZE } from '@/shared/constants';
import { gSSP } from '@/types/card-type';

import Head from 'next/head';
import Layout from '@/components/layout/layout';

export const getServerSideProps: GetServerSideProps<{ data: gSSP }> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { page, pageSize, search } = context.query;

    store.dispatch(
      getAllCards.initiate({
        page: page ? +page : PAGE,
        pageSize: pageSize ? +pageSize : PAGE_SIZE,
        search: search?.toString() || '',
      }),
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data: {
          cards: store.getState().cardsReducer,
          detailed: null,
        },
      },
    };
  });

const HomePage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { cards, detailed } = data;

  return (
    <>
      <Head>
        <title>REACT2023Q4 | MaxLisyanskiy</title>
      </Head>
      <Layout cards={cards} detailed={detailed} />
    </>
  );
};

export default HomePage;
