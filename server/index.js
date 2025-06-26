const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const REVIEWS_FILE = path.join(__dirname, 'data', 'reviews.json');

// Вспомогательные функции для работы с файлом
async function readReviews() {
  try {
    const data = await fs.readFile(REVIEWS_FILE, 'utf8');
    return JSON.parse(data).reviews;
  } catch (error) {
    console.error('Error reading reviews:', error);
    return [];
  }
}

async function writeReviews(reviews) {
  try {
    await fs.writeFile(REVIEWS_FILE, JSON.stringify({ reviews }, null, 2));
  } catch (error) {
    console.error('Error writing reviews:', error);
    throw error;
  }
}

// Routes
// Получить все отзывы
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await readReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении отзывов' });
  }
});

// Создать новый отзыв
app.post('/api/reviews', async (req, res) => {
  try {
    const reviews = await readReviews();
    const newReview = {
      id: Date.now().toString(),
      ...req.body,
      date: new Date().toISOString().split('T')[0],
      verified: true // Автоматически подтверждаем отзывы
    };
    
    reviews.push(newReview);
    await writeReviews(reviews);
    
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании отзыва' });
  }
});

// Подтвердить отзыв (для админов)
app.patch('/api/reviews/:id/verify', async (req, res) => {
  try {
    const reviews = await readReviews();
    const reviewIndex = reviews.findIndex(r => r.id === req.params.id);
    
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    
    reviews[reviewIndex].verified = true;
    await writeReviews(reviews);
    
    res.json(reviews[reviewIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при подтверждении отзыва' });
  }
});

// Удалить отзыв (для админов)
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const reviews = await readReviews();
    const filteredReviews = reviews.filter(r => r.id !== req.params.id);
    
    if (reviews.length === filteredReviews.length) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    
    await writeReviews(filteredReviews);
    res.json({ message: 'Отзыв удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении отзыва' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 