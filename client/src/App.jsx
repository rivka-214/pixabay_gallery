import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getImages,selectImages, selectLoading,selectError,selectCurrentCategory,selectCurrentPage, selectCurrentSortBy, nextPage, prevPage,
} from './redux/slices/imagesSlice';
import ImageGrid from './components/ImageGrid/ImageGrid.jsx';
import NavigationButtons from './components/NavigationButtons/NavigationButtons.jsx';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.jsx';
import CategoryButton from './components/CategoryButton/CategoryButton.jsx';
import SortButton from './components/SortButton/SortButton.jsx';  // ⬅️ חדש!
import './App.css';


 //App Component - הקומפוננטה הראשית

function App() {
  const dispatch = useDispatch();
  
  // שליפת נתונים מRedux
  const images = useSelector(selectImages);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentCategory = useSelector(selectCurrentCategory);
  const currentPage = useSelector(selectCurrentPage);
  const currentSortBy = useSelector(selectCurrentSortBy);

  
   // - Fetch images לפני render
   
  // שליפת תמונות מהשרת כשמשהו משתנה
  
  useEffect(() => {
    dispatch(getImages({ 
      category: currentCategory, 
      page: currentPage,
      sortBy: currentSortBy 
    }));
  }, [dispatch, currentCategory, currentPage, currentSortBy]);

  
   //  - טיפול בלחיצה על Next
  const handleNextPage = () => {
    dispatch(nextPage());
  };

  
  // - טיפול בלחיצה על Prev
  const handlePrevPage = () => {
    dispatch(prevPage());
  };

  return (
    <div className="app">
      {/* כותרת */}
      <header className="app-header">
        <h1>Pixabay Gallery</h1>
        <div className="header-buttons">
          <CategoryButton />
          <SortButton />  
        </div>
      </header>

      {/* ניווט */}
      <NavigationButtons 
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />

      {/* תוכן ראשי  */}
      <main className="app-main">
        {/* טעינה */}
        {loading && <LoadingSpinner />}
        
        
        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
            <button 
              onClick={() => dispatch(getImages({ 
                category: currentCategory, 
                page: currentPage,
                sortBy: currentSortBy 
              }))}
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* תמונות */}
        {!loading && !error && images.length > 0 && (
          <ImageGrid images={images} />
        )}

        {/* אין תוצאות */}
        {!loading && !error && images.length === 0 && (
          <div className="empty-state">
            <p>No images found.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Project developed by Rivki Asher as part of Home Assignment</p>
      </footer>
    </div>
  );
}

export default App;