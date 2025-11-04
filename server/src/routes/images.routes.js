import express from 'express';
import { getImages, getImageById } from '../controllers/images.controller.js';
import { 
  validateGetImages, 
  validateImageId 
} from '../middlewares/validation.js';

// יצירת Router instance
const router = express.Router();

/**
 * Images Routes
 * מגדיר את כל הנתיבים הקשורים לתמונות
 * כל route מוגן עם validation middleware
 */

// שליפת רשימת תמונות
router.get('/', validateGetImages, getImages);

// שליפת תמונה ספציפית לפי ID
router.get('/:id', validateImageId, getImageById);

export default router;