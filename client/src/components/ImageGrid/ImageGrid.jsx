import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard.jsx';
import './ImageGrid.css';



// קומפוננטת גריד תמונות
 
// מציג 9 תמונות בגריד 3x3
function ImageGrid({ images }) {
  
  // קח רק את 9 התמונות הראשונות להצגה
  const displayImages = images.slice(0, 9);


  // הצגת הקומפוננטה
 
  return (
    <section 
      className="image-grid"
      role="region"                           // מגדיר אזור בדף
      aria-label="Image gallery with 9 photos" // תיאור לקוראי מסך
    >
    
      {displayImages.map((image) => (
        <ImageCard 
          key={image.id}    // מזהה ייחודי לReact
          image={image}     // כל המידע על התמונה
        />
      ))}
    </section>
  );
}


// בדיקת טיפוסים

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(          // חייב להיות מערך של
    PropTypes.shape({                 // אובייקטים עם
      id: PropTypes.number.isRequired, // id שהוא מספר 
    })
  ).isRequired,  // כל המערך חובה
};

export default ImageGrid;