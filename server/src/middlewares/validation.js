/**
 * Validation Middlewares
 */

// בדיקת מספר עמוד
export const validatePageNumber = (req, res, next) => {
  const { page } = req.query;

  // אם אין page - זה בסדר, יש default ב-controller
  if (!page) {
    return next();
  }

  const pageNumber = parseInt(page, 10);

  // בדיקה שהעמוד תקין
  if (pageNumber < 1 || isNaN(pageNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Page number must be a positive integer',
      field: 'page'
    });
  }

  // שמירה ב-request לשימוש ב-controller
  req.validatedPage = pageNumber;
  next();
};

// בדיקת קטגוריה
export const validateCategory = (req, res, next) => {
  const { category } = req.query;


  if (!category) {
    return next();
  }

  // בדיקה בסיסית שזה string ולא ריק
  if (typeof category !== 'string' || category.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Category must be a non-empty string',
      field: 'category'
    });
  }

  // בדיקה שאין תווים מוזרים 
  const sanitizedCategory = category.trim();
  if (sanitizedCategory.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Category is too long (max 50 characters)',
      field: 'category'
    });
  }

  req.validatedCategory = sanitizedCategory;
  next();
};

// בדיקת מזהה תמונה
export const validateImageId = (req, res, next) => {
  const { id } = req.params;

 
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid image ID. Must be a number.',
      field: 'id'
    });
  }

  const imageId = parseInt(id, 10);

  if (imageId < 1) {
    return res.status(400).json({
      success: false,
      message: 'Image ID must be a positive number',
      field: 'id'
    });
  }
  req.validatedImageId = imageId;
  next();
};

// בדיקת סוג מיון
export const validateSortBy = (req, res, next) => {
  const { sortBy } = req.query;
  if (!sortBy) {
    return next();
  }

  const allowedSortOptions = ['id','latest'];

  if (!allowedSortOptions.includes(sortBy.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: `Invalid sort option. Allowed values: ${allowedSortOptions.join(', ')}`,
      field: 'sortBy',
      allowedValues: allowedSortOptions
    });
  }

  req.validatedSortBy = sortBy.toLowerCase();
  next();
};

// שרשרת validation לנתיב GET /images
// מריצים את כל הvalidations ברצף
export const validateGetImages = [
  validatePageNumber,
  validateCategory,
  validateSortBy
];