const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');

// TO-DO make chaining using next() when adding new review to order to update order's average rating

router.route('/:userId/:productId')
    .get(reviewController.getReviewByUserAndProduct)
    .patch(reviewController.updateReviewByUserAndProduct)
    .delete(reviewController.deleteReviewByUserAndProduct);

router.post('/', reviewController.createReview);

router.get('/user/id', reviewController.getReviewsByUser);

router.get('/product/id', reviewController.getReviewsByUser);

module.exports = router;