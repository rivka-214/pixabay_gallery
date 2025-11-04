import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, selectCurrentSortBy } from '../../redux/slices/imagesSlice';
import './SortButton.css';


 // כפתור מיון
function SortButton() {
  const dispatch = useDispatch();
  const currentSortBy = useSelector(selectCurrentSortBy);

 // החלפה בין מיון לפי ID ותאריך
  const handleToggle = () => {
    const newSort = currentSortBy === 'id' ? 'latest' : 'id';
    dispatch(setSortBy(newSort));
  };

  return (
    <button 
      className="sort-button"
      onClick={handleToggle}
      title={`Currently sorted by ${currentSortBy === 'id' ? 'ID' : 'Date'}`}
      aria-label={`Sort by ${currentSortBy === 'id' ? 'Date' : 'ID'}`}
    >
      Sort: {currentSortBy === 'id' ? 'ID' : 'Date'}
    </button>
  );
}

export default SortButton;