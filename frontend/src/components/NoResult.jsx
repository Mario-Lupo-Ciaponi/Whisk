import NoResultImage from "../assets/no-result-search.svg";
import "./NoResult.css";

const NoResult = () => {
  return (
    <div className="empty-state">
      <img className="illustration" src={NoResultImage} alt="no result image" />

      <header className="text-wrapper">
        <h2 className="empty-title">No Result</h2>
        <p className="empty-description">
          It seems we could not find the posts you were looking for!
        </p>
      </header>
    </div>
  );
};

export default NoResult;
