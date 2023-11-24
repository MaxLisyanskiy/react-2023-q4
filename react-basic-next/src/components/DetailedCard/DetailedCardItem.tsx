import Image from 'next/image';
import { IDetailedCard } from '../../types/card-type';
import classes from './DetailedCard.module.scss';

const DetailedCardItem = ({ character }: { character: IDetailedCard }) => {
  return (
    <div className={classes.item} key={character.id}>
      <div className={classes.itemImg} data-testid={'detailedCardImg'}>
        <Image
          src={character.images.small}
          width={250}
          height={350}
          alt={character.name}
          loading="eager"
          priority={true}
          style={{ width: '250px', height: '350px' }}
        />
      </div>
      <h2 className={classes.itemTitle} data-testid={'detailedCardName'}>
        {character.name} <span>HP: {character.hp} </span>
      </h2>
      <p className={classes.itemAdditional}>
        <span>Rarity:</span> {character.rarity}
      </p>
      <p className={classes.itemAdditional}>
        <span>Supertype:</span> {character.supertype}
      </p>
      <div className={classes.itemAdditional} data-testid={'detailedCardDescr'}>
        <span>Description:</span> {character.flavorText}
      </div>
    </div>
  );
};

export default DetailedCardItem;
