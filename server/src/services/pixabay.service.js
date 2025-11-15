import axios from 'axios';
import { PAGINATION , SORT_OPTIONS, DEFAULT_CATEGORY} from '../config/constants.js';

/**
 * Pixabay Service
 * - אחראית על כל התקשורת עם Pixabay API
 * - כוללת שליפת תמונות, מיון, ופרטי תמונה בודדת
 */
class PixabayService {
  constructor() {
    this.apiKey = process.env.PIXABAY_API_KEY;
    this.baseUrl = process.env.PIXABAY_BASE_URL;
    // בדיקה שהמשתנים קיימים - אחרת השרת לא יעבוד
    if (!this.apiKey) throw new Error('PIXABAY_API_KEY is not defined in .env file');
    if (!this.baseUrl) throw new Error('PIXABAY_BASE_URL is not defined in .env file');
    console.log('📡 Pixabay Service initialized successfully');
  }

  async fetchImages(category = DEFAULT_CATEGORY, page = PAGINATION.DEFAULT_PAGE, sortBy = SORT_OPTIONS.LATEST) {
    try {
      // Pixabay לא תומך במיון לפי ID, לכן נשתמש ב־latest ונמיין אצלנו אם נדרש
      const pixabayOrder = sortBy === 'id' ? 'latest' : sortBy;
      const params = {
        key: this.apiKey,
        q: category,
        page,
        per_page: PAGINATION.ITEMS_PER_PAGE,
        order: pixabayOrder,
        image_type: 'photo',
        safesearch: true,
      };

      console.log('🔍 Pixabay API Request:', { category, page, sortBy });

      const response = await axios.get(this.baseUrl, { params });
      const { hits, totalHits, total } = response.data;

      // total = סך כל התוצאות שנמצאו בקטגוריה
      // totalHits = מקסימום 500 תוצאות שניתן להציג בפועל
      console.log(`✅ Pixabay API Response: ${hits.length} images, total: ${total}, totalHits: ${totalHits}`);

      // אם המשתמש ביקש מיון לפי ID – נמיין לוקאלית
      let sortedData = hits;
      if (sortBy === 'id') {
        sortedData = this._sortById(sortedData);
      }

      // החזרת הנתונים המעובדים
      return {
        success: true,
        data: sortedData,
        totalResults: total, // סך הכל תוצאות בקטגוריה
        totalHits,           // תוצאות ניתנות להצגה (מקסימום 500)
        currentPage: page,
      };
    } catch (error) {
      console.error('❌ Pixabay API Error:', error.message);
      if (error.response) {
        throw new Error(`Pixabay API Error: ${error.response.data.message || error.message}`);
      }
      throw new Error(`Failed to fetch images: ${error.message}`);
    }
  }

  /**
   * מיון תמונות לפי ID
   * פונקציה פרטית לשימוש פנימי בלבד
   */
  _sortById(images) {
    return images.sort((a, b) => a.id - b.id);
  }

  /**
   * שליפת פרטים של תמונה בודדת לפי ID
   * @param {number} imageId - מזהה תמונה ב-Pixabay
   */
  async fetchImageDetails(imageId) {
    try {
      const params = { key: this.apiKey, id: imageId };
      const response = await axios.get(this.baseUrl, { params });
      if (!response.data.hits.length) throw new Error('Image not found');
      return { success: true, data: response.data.hits[0] };
    } catch (error) {
      console.error('❌ Error fetching image details:', error.message);
      throw new Error(`Failed to fetch image details: ${error.message}`);
    }
  }
}

export default new PixabayService();
