import { Link, NavLink } from 'react-router-dom';
import { PathConstants } from '../../utils/router';

import classes from './header.module.scss';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to={PathConstants.HOME}>
        📝
      </Link>
      <nav>
        <NavLink
          to={PathConstants.UNCONTROLLED}
          className={({ isActive }) =>
            [isActive ? classes.buttonActive : '', classes.button].join(' ')
          }
        >
          Uncontrolled Form
        </NavLink>
        <NavLink
          to={PathConstants.RHF}
          className={({ isActive }) =>
            [isActive ? classes.buttonActive : '', classes.button].join(' ')
          }
        >
          React Hook Form
        </NavLink>
      </nav>
    </header>
  );
};
