import { useAppSelector } from '../store/redux-hooks';

export const MainPage = () => {
  const forms = useAppSelector((state) => state.formReducer.forms);
  console.log(forms);
  return (
    <section>
      <h1>Main Page</h1>

      <ul className="list">
        {forms.map((item, index) => {
          return (
            <li key={index} className={`item ${index === 0 ? 'active' : ''}`}>
              {index === 0 && <span className="item__label">New form</span>}
              <img className="item__img" src={item.img} />
              <div className="item__content">
                <p>
                  <span>Name:</span> {item.name}
                </p>
                <p>
                  <span>Age:</span> {item.age}
                </p>
                <p>
                  <span>Email:</span> {item.email}
                </p>
                <p>
                  <span>Gender:</span> {item.gender}
                </p>
                <p>
                  <span>Country:</span> {item.country}
                </p>
                <p>
                  <span>Password:</span> {item.password}
                </p>
                <p>
                  <span>{'T&C:'}</span> {String(item.t_c)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
