import NoResultImage from "../../assets/no-result-image.svg";

import "./NoResult.css";

const NoResult = ({ type }) => {
  const notFoundTypes = {
    post: {
      title: "No posts found",
      description: "It seems we could not find the posts you were looking for!",
    },
    user: {
      title: "No users found",
      description: "It seems we could not find the users you were looking for!",
    },
    notifications: {
      title: "No notifications",
      description: "Currently there are no notifications. Try checking later."
    }
  }

  return (
    <div className="empty-state">
      <img className="illustration" src={NoResultImage} alt="no result image" />

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
