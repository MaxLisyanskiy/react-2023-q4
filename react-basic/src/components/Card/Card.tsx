import { Link } from 'react-router-dom';
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
  return (
    <li className={classes.item} data-testid={'cardItem'}>
      <Link to={generateLink(item.currentPage, item.currentPageSize, item.id)}>
        <div className={classes.imgWrapp}>
          <img className={classes.img} src={item.image} alt={item.name} />
        </div>
        <h4 className={classes.itemTitle}>{item.name}</h4>
      </Link>
    </li>
  );
};

export default Card;
