import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PAGE_SIZE } from '@/shared/constants';
import ErrorBtn from '@/components/Error/ErrorBtn';
import Image from 'next/image';
import classes from './Search.module.scss';

const Search = () => {
  const router = useRouter();
  const { query } = router;
  const { pageSize, search } = query;

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (search) setValue(`${search}`);
  }, []); // eslint-disable-line

  const handleSeacrh = () => {
    router.push({
      query: { page: 1, pageSize: pageSize ?? PAGE_SIZE, search: value },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header className={classes.search}>
      <Image
        src="/logo.png"
        width={50}
        height={50}
        priority={true}
        alt="Logo"
      />
      <div className={classes.wrapp}>
        <input
          className={classes.input}
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          data-testid={'searchInput'}
        />
        <button onClick={handleSeacrh} data-testid={'searchBtn'}>
          Search 🔍
        </button>
      </div>
      <ErrorBtn />
    </header>
  );
};

export default Search;
