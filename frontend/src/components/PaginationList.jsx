import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./PaginationList.css";

const PaginationList = ({ currentPage, setCurrentPage, totalPages }) => {
  const goToPreviousPage = () => setCurrentPage((prev) => prev - 1);
  const goToNextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="pagination-list">
      <button
        disabled={currentPage === 1}
        className="paginate-btn"
        onClick={goToPreviousPage}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <span className="current-page">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        className="paginate-btn"
        onClick={goToNextPage}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default PaginationList;
