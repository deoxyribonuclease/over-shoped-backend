const express = require('express');
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

router.get('/:userId', favoriteController.getFavoritesByUser);

router.route('/:userId/:productId')
.get(favoriteController.getFavoriteByUserAndProduct)
.post(favoriteController.addFavorite)
.delete(favoriteController.deleteFavorite);

module.exports = router;