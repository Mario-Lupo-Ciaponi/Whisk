import NoResultImage from "../../assets/no-post-found-image.svg";
import NoUserFound from "../../assets/no-user-found-image.svg";
import "./NoResult.css";

const NoResult = ({ type }) => {
  const notFoundTypes = {
    post: {
      image: NoResultImage,
      title: "No posts found",
      description: "It seems we could not find the posts you were looking for!",
    },
    user: {
      image: NoUserFound,
      title: "No users found",
      description: "It seems we could not find the users you were looking for!",
    }
  }

  return (
    <div className="empty-state">
      <img className="illustration" src={notFoundTypes[type].image} alt="no result image" />

      <header className="text-wrapper">
        <h2 className="empty-title">{notFoundTypes[type].title}</h2>
        <p className="empty-description">
          {notFoundTypes[type].description}
        </p>
      </header>
    </div>
  );
};

export default NoResult;
