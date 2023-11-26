import { ICard } from '@/types/card-type';
import Card from '../Card/Card';
import Image from 'next/image';
import classes from './CardList.module.scss';

export interface CardListProps {
  data: ICard[];
}

const CardList = (props: CardListProps) => {
  const { data } = props;

  return data.length > 0 ? (
    <ul className={classes.list} data-testid={'caracters'}>
      {data.map((item) => (
        <Card
          id={item.id}
          key={item.id}
          name={item.name}
          image={item.images.small}
        />
      ))}
    </ul>
  ) : (
    <div className={classes.notFound} data-testid={'cardListEmpty'}>
      <p data-testid={'cardsNotFound'}>Opps... not found</p>
      <Image
        className={classes.notFoundImg}
        src="/psyduck.png"
        width={150}
        height={150}
        alt="not-found-pockemon"
      />
    </div>
  );
};

export default CardList;
