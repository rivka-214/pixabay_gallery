import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/slices/imagesSlice';
import { CATEGORIES } from '../../constants/constants';
import './CategoryModal.css';
import PropTypes from 'prop-types';
/**
 * מודל בחירת קטגוריה
 * מציג grid של כל הקטגוריות האפשריות
 * בלחיצה - מעדכן Redux וסגר את המודל
 */
CategoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
function CategoryModal({ onClose }) {
  const dispatch = useDispatch();
  // בחירת קטגוריה - עדכון Redux וסגירת מודל
  const handleSelect = (category) => {
    dispatch(setCategory(category));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content category-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2>Select Category</h2>
           {/* grid של קטגוריות */}
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="category-item"
              onClick={() => handleSelect(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;