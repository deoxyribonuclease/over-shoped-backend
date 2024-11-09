const favoriteService = require("../services/favoriteService");

const getFavoritesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await favoriteService.getAllByUser(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to get favorites: ${error.message}` });
  }
};

const getFavoriteByUserAndProduct = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const favorite = await favoriteService.getByUserAndProduct(
      userId,
      productId
    );
    if (favorite) {
      res.status(200).json(favorite);
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get favorite: ${error.message}` });
  }
};

const addFavorite = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const newFavorite = await favoriteService.addByUserAndProduct(
      userId,
      productId
    );
    if (newFavorite) {
      res.status(200).json(newFavorite);
    } else {
      res.status(409).json({ message: 'Favorite already exists' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to add to favorites: ${error.message}` });
  }
};

const deleteFavorite = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    if (await favoriteService.delByUserAndProduct(userId, productId)) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: `Favorite not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete favorite: ${error.message}` });
  }
};

module.exports = {
  getFavoritesByUser,
  getFavoriteByUserAndProduct,
  addFavorite,
  deleteFavorite,
};
