const reviewService = require("../services/reviewService");
const productService = require("../services/productService");

const getReviewsByProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await reviewService.getAllByProduct(id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

const getReviewsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await reviewService.getAllByUser(id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

const getReviewByUserAndProduct = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const review = await reviewService.getByUserAndProduct(userId, productId);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

const getReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await reviewService.get(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

const createReview = async (req, res, next) => {
  const { productId, userId, text, rating } = req.body;
  try {
    const newReview = await reviewService.add({
      productId,
      userId,
      text,
      rating,
    });
    if(newReview) {

    } else {
      res.status(409).json({ message: 'Review already exists' });
    }
    req.review = newReview;
    req.productId = productId;
    next();
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

const updateProductRating = async (req, res) => {
  const { productId } = req;
  const { review } = req;
  try {
    const reviews = await reviewService.getAllByProduct(productId);
    if (reviews.length === 0) {
      return res
        .status(200)
        .json({ message: "No reviews to calculate rating" });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    console.log(averageRating);
    await productService.update(productId, { rating: averageRating });
    res
      .status(200)
      .json({
        message: "Review added and rating updated successfully",
        review: review,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update product rating: ${error.message}` });
  }
};

const updateReviewByUserAndProduct = async (req, res) => {
  const { userId, productId } = req.params;
  const { text, rating } = req.body;
  try {
    const updatedReview = await reviewService.updateByUserAndProduct(
      userId,
      productId,
      {
        text,
        rating,
      }
    );
    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update review: ${error.message}` });
  }
};

const deleteReviewByUserAndProduct = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    if (await reviewService.delByUserAndProduct(userId, productId)) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete review: ${error.message}` });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    if (await reviewService.del(id)) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete review: ${error.message}` });
  }
};

module.exports = {
  getReviewsByProduct,
  getReviewsByUser,
  getReview,
  getReviewByUserAndProduct,
  createReview,
  updateReviewByUserAndProduct,
  deleteReview,
  deleteReviewByUserAndProduct,
  updateProductRating,
};
