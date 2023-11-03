import notFoundIMG from '../../assets/not-found.webp';

const About = () => {
  return (
    <div className="characters__not-found">
      <p>Opps... not found</p>
      <img src={notFoundIMG} alt="notFoundIMG" />
    </div>
  );
};

export default About;
