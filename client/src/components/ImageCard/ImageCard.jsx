import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageDetailsModal from '../ImageDetailsModal/ImageDetailsModal.jsx';
import './ImageCard.css';

/**
 * כרטיס תמונה - כשלוחצים עליו נפתח modal עם פרטים
 * מקבל: image object מהAPI
 * מציג: תמונה + tags + views/likes בhover
 */
function ImageCard({ image }) {
   // state לפתיחה/סגירה של המודל
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article 
        className="image-card"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View details of ${image.tags}`}
      >
        <div className="image-wrapper">
          <img 
            src={image.webformatURL} 
            alt={image.tags}
            loading="lazy"// טעינה עצלה - חוסך bandwidth
          />
            {/* מידע שמופיע בhover */}
          <div className="image-overlay">
            <p className="image-tags">{image.tags}</p>
            <div className="image-stats">
              <span>👁️ {image.views.toLocaleString()}</span>
              <span>❤️ {image.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </article>

      {/* מודל פרטי תמונה - נפתח בלחיצה */}
      {isModalOpen && (
        <ImageDetailsModal 
          image={image} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageCard;