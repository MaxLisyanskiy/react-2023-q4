import classes from './Spinner.module.scss';

export default function Spinner() {
  return (
    <div className={classes.container}>
      <div className={classes.spinner}></div>
    </div>
  );
}
