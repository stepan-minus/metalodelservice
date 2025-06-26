const Review = require('../models/Review');

// Получить все подтвержденные отзывы
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ verified: true })
      .sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Создать новый отзыв
exports.createReview = async (req, res) => {
  const review = new Review({
    name: req.body.name,
    text: req.body.text,
    rating: req.body.rating,
    projectType: req.body.projectType
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Подтвердить отзыв (только для админов)
exports.verifyReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    
    review.verified = true;
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удалить отзыв (только для админов)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    
    await review.remove();
    res.json({ message: 'Отзыв удален' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 