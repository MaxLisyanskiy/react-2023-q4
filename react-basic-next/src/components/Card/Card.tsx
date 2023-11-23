// import { Link } from 'react-router-dom';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { generateLink } from '../../utils/generate-link';

import classes from './Card.module.scss';

export interface CardProps {
  id: string;
  image: string;
  name: string;
  currentPage: number;
  currentPageSize: number;
}

const Card = (item: CardProps) => {
  const router = useRouter();
  const { pathname, query } = router;

  return (
    <li className={classes.item}>
      <Link
        href={{
          pathname,
          query: { ...query, detailedId: `${item.id}` },
        }}
        // href={generateLink(item.currentPage, item.currentPageSize, item.id)}
        data-testid={'cardItem'}
      >
        <div className={classes.imgWrapp}>
          <Image
            // className={classes.img}
            src={item.image}
            width={200}
            height={300}
            alt={item.name}
          />
        </div>
        <h4 className={classes.itemTitle}>{item.name}</h4>
      </Link>
    </li>
  );
};

export default Card;
