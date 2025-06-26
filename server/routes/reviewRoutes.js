const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Получить все подтвержденные отзывы
router.get('/', reviewController.getReviews);

// Создать новый отзыв
router.post('/', reviewController.createReview);

// Подтвердить отзыв (требует аутентификации админа)
router.patch('/:id/verify', reviewController.verifyReview);

// Удалить отзыв (требует аутентификации админа)
router.delete('/:id', reviewController.deleteReview);

module.exports = router; 