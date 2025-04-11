import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-full border border-gray-400 bg-white shadow-md 
        hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        ← Prev
      </button>


      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-full border shadow-md transition-all font-medium
          ${
            currentPage === index + 1
              ? "bg-black text-white border-black scale-110" 
              : "bg-white text-black border-gray-400 hover:bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}


      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-full border border-gray-400 bg-white shadow-md 
        hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Next →
      </button>
    </div>
  );
};


Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;


  