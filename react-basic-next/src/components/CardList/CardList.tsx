import Card from '../Card/Card';
import classes from './CardList.module.scss';
import { ICard } from '@/types/card-type';
import Image from 'next/image';

export interface CardListProps {
  data: ICard[];
}

const CardList = (props: CardListProps) => {
  const { data } = props;

  return (
    <section className={classes.section}>
      {data.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className={classes.notFound}>
          <p data-testid={'cardsNotFound'}>Opps... not found</p>
          <Image
            className={classes.notFoundImg}
            src="/psyduck.png"
            width={150}
            height={150}
            alt="not-found-pockemon"
          />
        </div>
      )}
    </section>
  );
};

export default CardList;
