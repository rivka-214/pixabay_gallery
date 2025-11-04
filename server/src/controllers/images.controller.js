import pixabayService from '../services/pixabay.service.js';
import { PAGINATION, DEFAULT_CATEGORY } from '../config/constants.js';

/**
 * Images Controller
 * - מכיל את הלוגיקה העסקית לשליפת תמונות מהשירות
 * - כולל טיפול במיון, pagination, ובדיקות תוצאות
 */

// שליפת תמונות עם pagination ומיון
export const getImages = async (req, res, next) => {
  try {
    // שליפת הפרמטרים מה-query או ערכי ברירת מחדל
    const { category = DEFAULT_CATEGORY, sortBy = 'latest' } = req.query;
    const pageNumber = req.validatedPage || PAGINATION.DEFAULT_PAGE;
    const searchCategory = req.validatedCategory || category;
    const searchSortBy = req.validatedSortBy || sortBy;

    console.log(`Fetching images - Category: ${searchCategory}, Page: ${pageNumber}, Sort: ${searchSortBy}`);

    // קריאה ל-service
    const result = await pixabayService.fetchImages(searchCategory, pageNumber, searchSortBy);

    // חישוב התוצאות לתצוגה
    const totalResults = result.totalResults;            // סך כל התוצאות
    const displayedResults = Math.min(result.totalHits, 500); // עד 500 בלבד להצגה בפועל
    const itemsPerPage = PAGINATION.ITEMS_PER_PAGE;
    const totalPages = Math.ceil(displayedResults / itemsPerPage);

    console.log(' Pagination computed:', {
      displayedResults,
      totalResults,
      itemsPerPage,
      totalPages,
    });

    // החזרת תגובה ללקוח
    res.status(200).json({
      success: true,
      message: 'Images fetched successfully',
      data: result.data,
      pagination: {
        currentPage: pageNumber,
        displayedResults,
        totalResults,
        totalPages,
        itemsPerPage,
      },
      category: searchCategory,
      sortBy: searchSortBy,
    });
  } catch (error) {
    console.error('❌ Error in getImages controller:', error.message);
    next(error);
  }
};

// שליפת פרטי תמונה בודדת
export const getImageById = async (req, res, next) => {
  try {
    const imageId = req.validatedImageId;
    console.log(`🔎 Fetching image details for ID: ${imageId}`);

    const result = await pixabayService.fetchImageDetails(imageId);

    res.status(200).json({
      success: true,
      message: 'Image details fetched successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('❌ Error in getImageById controller:', error.message);
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }
    next(error);
  }
};
