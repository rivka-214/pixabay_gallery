import { useState } from 'react';
import CategoryModal from '../CategoryModal/CategoryModal.jsx';
import './CategoryButton.css';

/**
 * כפתור בחירת קטגוריה
 * כשלוחצים עליו נפתח modal עם רשימת הקטגוריות
 */
function CategoryButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className="category-button"
        onClick={() => setIsModalOpen(true)}
      >
        Change Category
      </button>
{/* מודל רשימת קטגוריות */}
      {isModalOpen && (
        <CategoryModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default CategoryButton;