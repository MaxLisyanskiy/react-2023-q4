import { Link } from 'react-router-dom';
import { RHKForm } from '../components/form/rhk-form';
import { PathConstants } from '../utils/router';

export const ReactHookFormPage = () => {
  return (
    <section className="page">
      <div className="page-content">
        <Link className="page-back-link" to={PathConstants.HOME}>
          <span>➜</span>
          <p>Return back</p>
        </Link>
        <h1>React Hook Form</h1>
        <RHKForm />
      </div>
    </section>
  );
};
