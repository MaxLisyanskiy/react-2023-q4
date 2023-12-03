import { Link } from 'react-router-dom';
import { UncontrolledForm } from '../components/form/uncontrolled-form';
import { PathConstants } from '../utils/router';

export const UncontrolledFormPage = () => {
  return (
    <section className="page">
      <div className="page-content">
        <Link className="page-back-link" to={PathConstants.HOME}>
          <span>➜</span>
          <p>Return back</p>
        </Link>
        <h1>Uncontrolled Form</h1>
        <UncontrolledForm />
      </div>
    </section>
  );
};
