import './LoadingSpinner.css';

// קומפוננטת ספינר טעינה
function LoadingSpinner() {
  return (
    <div 
      className="loading-spinner-container" 
      role="status"        
      aria-live="polite"      
    >
  
      <div 
        className="loading-spinner" 
        aria-hidden="true"    
      />
      
      <p className="loading-text">
        Loading images...
      </p>
    </div>
  );
}

export default LoadingSpinner;