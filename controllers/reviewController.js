const { ResultWithContextImpl } = require('express-validator/lib/chain');
const reviewService = require('../services/reviewService');

const getReviewsByProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await reviewService.getAllByProduct(id)
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({error: `Server error: ${error.message}`});
    }
};

const getReviewsByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await reviewService.getAllByUser(id)
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({error: `Server error: ${error.message}`});
    }
}; 

const getReviewByUserAndProduct = async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const review = await reviewService.getReviewByUserAndProduct(userId, productId);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found'});
        }
    } catch (error) {
        res.status(500).json({error: `Server error: ${error.message}`});
    }
};

const getReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await reviewService.get(id);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found'});
        }
    } catch (error) {
        res.status(500).json({error: `Server error: ${error.message}`});
    }
};

const createReview = async (req, res) => {
    const { productId, userId, text, rating } = req.body;
    try {
        const newReview = await reviewService.add({
            productId,
            userId,
            text,
            rating
        });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const updateReviewByUserAndProduct = async (req, res) => {
    const { userId, productId } = req.params;
    const { text, rating } = req.body;
    try {
        const updatedReview = reviewService.updateByUserAndProduct(userId, productId, {
            text,
            rating
        });
        if (updatedReview) {
            res.status(200).json(updateReview);
        } else {
            res.status(404).json({ error: 'Review not found'});
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update review: ${error.message}` });
    }
};

const deleteReviewByUserAndProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (await reviewService.del(id)) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    }  catch (error) {
        res.status(500).json({ error: `Failed to delete review: ${error.message}` });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        if (await reviewService.del(id)) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    }  catch (error) {
        res.status(500).json({ error: `Failed to delete review: ${error.message}` });
    }
};

module.exports = {getReviewsByProduct, getReviewsByUser, getReview, getReviewByUserAndProduct, createReview, updateReviewByUserAndProduct, deleteReview, deleteReviewByUserAndProduct};