import "./PaginationList.css";

const PaginationList = ({ currentPage, setCurrentPage, totalPages }) => {
    const goToPreviousPage = () => setCurrentPage(prev => prev - 1);
    const goToNextPage = () => setCurrentPage(prev => prev + 1);

    return (
        <div className="pagination-list">
            <button disabled={currentPage === 1} className="previous-btn" onClick={goToPreviousPage}>
                Previous
            </button>

            <span className="current-page">Page {currentPage} of {totalPages}</span>

            <button disabled={currentPage === totalPages} className="next-btn" onClick={goToNextPage}>
                Next
            </button>
        </div>
    );
}

export default PaginationList;
