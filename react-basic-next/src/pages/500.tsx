import ErrorPage500 from '@/components/Error/ErrorPage500';
import { NextPage } from 'next';
import Head from 'next/head';

const Error500Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>500 | REACT2023Q4 | MaxLisyanskiy</title>
      </Head>
      <ErrorPage500 />
    </>
  );
};

export default Error500Page;
