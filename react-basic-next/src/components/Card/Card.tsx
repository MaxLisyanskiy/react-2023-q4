import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import classes from './Card.module.scss';

export interface CardProps {
  id: string;
  image: string;
  name: string;
}

const Card = (item: CardProps) => {
  const router = useRouter();
  const { query } = router;

  return (
    <li className={classes.item}>
      <Link
        href={{
          pathname: `/${item.id}`,
          query: { ...query },
        }}
        data-testid={'cardItem'}
      >
        <div className={classes.imgWrapp}>
          <Image
            src={item.image}
            width={200}
            height={300}
            alt={item.name}
            loading="eager"
            priority={true}
            style={{ width: '200px', height: '300px' }}
          />
        </div>
        <h4 className={classes.itemTitle}>{item.name}</h4>
      </Link>
    </li>
  );
};

export default Card;
