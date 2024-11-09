const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get("/user/:id", reviewController.getReviewsByUser);

router.get("/product/:id", reviewController.getReviewsByProduct);

router
    .route("/:userId/:productId")
    .get(reviewController.getReviewByUserAndProduct)
    .patch(reviewController.updateReviewByUserAndProduct)
    .delete(reviewController.deleteReviewByUserAndProduct);

router.post(
    "/",
    reviewController.createReview,
    reviewController.updateProductRating
);

module.exports = router;
