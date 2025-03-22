const router = require('express').Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const User = require('../models/User');

// Get reviews for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ reviewed: req.params.userId })
      .populate('reviewer', 'name avatar')
      .populate('transaction', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { reviewed, rating, comment, transaction } = req.body;
    
    // Check if user has already reviewed this transaction
    const existingReview = await Review.findOne({
      reviewer: req.user.id,
      transaction
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this transaction' });
    }

    const review = new Review({
      reviewer: req.user.id,
      reviewed,
      rating,
      comment,
      transaction
    });

    await review.save();

    // Update user's average rating
    const userReviews = await Review.find({ reviewed });
    const avgRating = userReviews.reduce((acc, curr) => acc + curr.rating, 0) / userReviews.length;
    
    await User.findByIdAndUpdate(reviewed, {
      'rating.average': avgRating,
      'rating.count': userReviews.length
    });

    await review.populate('reviewer', 'name avatar');
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a review
router.patch('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      reviewer: req.user.id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['rating', 'comment'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(update => review[update] = req.body[update]);
    await review.save();

    // Update user's average rating
    const userReviews = await Review.find({ reviewed: review.reviewed });
    const avgRating = userReviews.reduce((acc, curr) => acc + curr.rating, 0) / userReviews.length;
    
    await User.findByIdAndUpdate(review.reviewed, {
      'rating.average': avgRating
    });

    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      reviewer: req.user.id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update user's average rating
    const userReviews = await Review.find({ reviewed: review.reviewed });
    const avgRating = userReviews.length > 0
      ? userReviews.reduce((acc, curr) => acc + curr.rating, 0) / userReviews.length
      : 0;
    
    await User.findByIdAndUpdate(review.reviewed, {
      'rating.average': avgRating,
      'rating.count': userReviews.length
    });

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 