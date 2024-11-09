const Favorite = require("../models/favorite");

const getAllByUser = async (id) => {
  return await Favorite.findAll({ where: { userId: id } });
};

const getByUserAndProduct = async (userId, productId) => {
  return await Favorite.findOne({ where: { userId: userId, productId: productId } });
};

const addByUserAndProduct = async (userId, productId) => {
  return await Favorite.create({
    userId: userId,
    productId: productId
  });
};

const delByUserAndProduct = async (userId, productId) => {
  const favorite = await Favorite.findOne({ where: { userId: userId, productId: productId } });
  if (favorite) {
    favorite.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllByUser,
  getByUserAndProduct,
  addByUserAndProduct,
  delByUserAndProduct
};
