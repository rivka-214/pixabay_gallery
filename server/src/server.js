import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import imagesRoutes from './routes/images.routes.js';

// יצירת אפליקציית Express
const app = express();
const PORT = process.env.PORT || 5000;

// הגדרת CORS לאפשר בקשות מהפרונטאנד
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// כדי לקרוא JSON מהבקשות
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route בסיסי לבדיקה
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Pixabay Gallery API is running! 🚀',
    endpoints: {
      images: '/api/images',
      imageById: '/api/images/:id',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// נתיבי תמונות
app.use('/api/images', imagesRoutes);



// טיפול בשגיאות - חייב להיות בסוף
app.use(notFoundHandler);
app.use(errorHandler);

// הפעלת השרת
app.listen(PORT, () => {
   console.log('=================================');
  console.log('Server is running on port ' + PORT);
  console.log('URL: http://localhost:' + PORT);
  console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log('=================================');
});
