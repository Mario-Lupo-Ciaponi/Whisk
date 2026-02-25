import MapImage from "../../assets/map-image.png";
import PawPet from "../../assets/paw-pet.jpg";
import HuggingPet from "../../assets/hugging-pet.jpg";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <section className="about-section">
      <title>About this Project</title>

      <div className="about-project">
        <article className="about-card">
          <div className="text-wrapper">
            <h2 className="title">About This Platform</h2>

            <p className="description">
              Helping reunite <strong>lost pets</strong> with the people who
              love them — anywhere in the world. This platform was created by a
              student with one clear mission: to make it easier for{" "}
              <strong>lost pets</strong> to find their way home. When a pet goes
              missing, every second matters. I wanted to build a focused,
              practical tool that combines community support with precise
              location technology. Each post shared on the app includes an
              interactive map feature where users can mark the exact location
              related to a lost or found pet. The coordinates connect directly
              to <strong>Google Maps</strong>, allowing others to navigate to
              the area quickly and accurately. The goal is simple — reduce
              confusion, increase visibility, and improve the chances of a safe
              reunion.
            </p>
          </div>
          <div className="image-container">
            <img className="card-image" src={MapImage} alt="map image" />
          </div>
        </article>

        <article className="about-card">
          <div className="text-wrapper">
            <h2 className="title">Who It’s For</h2>

            <p className="description">
              This platform is built for:
              <ul className="about-list">
                <li className="item">
                  Pet owners searching for their lost companions
                </li>
                <li className="item">
                  Individuals or shelters who have found a pet and want to
                  locate its owner
                </li>
                <li className="item">
                  Anyone willing to help reunite pets and families
                </li>
              </ul>
              Whether you’re posting, searching, or supporting, you are part of
              a community working toward the same outcome.
            </p>
          </div>
          <div className="image-container left">
            <img className="card-image" src={PawPet} alt="map image" />
          </div>
        </article>

        <article className="about-card">
          <div className="text-wrapper">
            <h2 className="title">Why I built it</h2>

            <p className="description">
              I saw how scattered and inefficient lost pet searches can be
              across general social media platforms. Important location details
              often get buried, and coordination becomes difficult. I wanted to
              create a dedicated space where every post is structured around
              action — especially location accuracy. This platform is focused,
              purpose-driven, and continuously improving with its users in mind.
              My goal is to grow a global network of people who are ready to
              help when a pet goes missing. By combining technology with
              community compassion, we can make lost pet searches faster,
              clearer, and more effective. Every reunion matters.
            </p>
          </div>
          <div className="image-container">
            <img className="card-image" src={HuggingPet} alt="map image" />
          </div>
        </article>
      </div>
    </section>
  );
};

export default AboutPage;
