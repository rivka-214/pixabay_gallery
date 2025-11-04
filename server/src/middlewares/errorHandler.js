
// מטפל בכל השגיאות שקורות באפליקציה
export const errorHandler = (err, req, res, next) => {
  // Log error לקונסול 
  console.error(' Error:', err.message);
  console.error('Stack:', err.stack);

   // אם יש status code ספציפי משתמשים בו, אחרת 500
  const statusCode = err.statusCode || 500;
  

  const errorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
 // מציגים stack trace רק בפיתוח, לא בייצור
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(errorResponse);
};

/**
 
 * מטפל ב-routes שלא קיימים
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};