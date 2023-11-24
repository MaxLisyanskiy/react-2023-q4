import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '@/store/store';
import {
  getAllCards,
  getDetailedCard,
  getRunningQueriesThunk,
} from '@/services/fetchData';
import { PAGE, PAGE_SIZE } from '@/utils/constants';
import { gSSP } from '@/types/card-type';

import Head from 'next/head';
import Layout from '@/components/layout/layout';

export const getServerSideProps: GetServerSideProps<{ data: gSSP }> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { page, pageSize, search } = context.query;
    const detailedId = context?.params?.detailed;

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

const DetailedPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { cards, detailed } = data;

  return (
    <>
      <Head>
        <title>Detailed | REACT2023Q4 | MaxLisyanskiy</title>
      </Head>
      <Layout cards={cards} detailed={detailed} />
    </>
  );
};

export default DetailedPage;
