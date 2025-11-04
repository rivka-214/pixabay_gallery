import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  selectCurrentPage, 
  selectTotalPages,
  selectDisplayedResults,
  selectTotalResults
} from '../../redux/slices/imagesSlice';
import './NavigationButtons.css';

// כפתורי ניווט בין עמודים
function NavigationButtons({ onPrev, onNext }) {
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const displayedResults = useSelector(selectDisplayedResults);
  const totalResults = useSelector(selectTotalResults);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav 
      className="navigation-buttons" 
      aria-label="Pagination navigation"
    >
      {/* Prev Button */}
      <button
        onClick={onPrev}
        disabled={isFirstPage}
        className="nav-button nav-button-prev"
        aria-label="Go to previous page"
        title="Previous 9 images"
      >
        ← Prev
      </button>

     
      <div className="page-info" aria-live="polite">
        <div>Page {currentPage} of {totalPages || 0}</div>
        <div className="results-info">
          Showing {displayedResults} results
          <br />
          (from {totalResults?.toLocaleString() || 0} total matches)
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isLastPage}
        className="nav-button nav-button-next"
        aria-label="Go to next page"
        title="Next 9 images"
      >
        Next →
      </button>
    </nav>
  );
}

NavigationButtons.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default NavigationButtons;