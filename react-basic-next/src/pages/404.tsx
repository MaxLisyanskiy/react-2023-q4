import { NextPage } from 'next';
import Head from 'next/head';
import NotFound from '@/components/NotFound/NotFound';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 | REACT2023Q4 | MaxLisyanskiy</title>
      </Head>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
