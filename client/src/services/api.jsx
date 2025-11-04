import axios from 'axios';
import { API_URL } from '../constants/constants';

/**
 * יצירת axios client עם הגדרות בסיסיות
 * baseURL, timeout, headers
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
/**
 * Interceptor לטיפול בשגיאות
 * מדפיס שגיאות לconsole בצורה מסודרת
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// שליפת תמונות מהשרת
export const fetchImages = async (category = 'nature', page = 1, sortBy = 'latest') => {
  try {
    const response = await apiClient.get('/images', {
      params: { category, page, sortBy },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch images');
  }
};

//שליפת פרטי תמונה בודדת
export const fetchImageById = async (imageId) => {
  try {
    const response = await apiClient.get(`/images/${imageId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch image details');
  }
};

export default apiClient;