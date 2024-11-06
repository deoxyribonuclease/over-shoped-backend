const Review = require('../models/review');

const getAllByUser = async (id) => {
    return await Review.findAll({ where: { userId: id } });
};

const getAllByProduct = async (id) => {
    return await Review.findAll({ where: { productId: id } });
};

const getByUserAndProduct = async (userId, productId) => {
    return await Review.findOne({ where: { productId: productId, userId: userId } });
};

const get = async (id) => {
    return await Review.findByPk(id);
}

const add = async (reviewData) => {
    const { productId, userId, text, rating } = reviewData;
    return await Review.create({
        productId,
        userId,
        text,
        rating
    });
};

const update = async (id, reviewData) => {
    const { productId, userId, text, rating } = reviewData;
    const review = await Review.findByPk(id);
    if (review) {
       review.productId = productId || review.productId;
       review.userId = userId || review.userId;
       review.text = text || review.text;
       review.rating = rating || review.rating;
       return await review.save();
    }
    return null;
};

const updateByUserAndProduct = async (userId, productId, reviewData) => {
    const { text, rating } = reviewData;
    const review = await Review.findOne({ where: { productId: productId, userId: userId } });
    if (review) {
       review.text = text || review.text;
       review.rating = rating || review.rating;
       return await review.save();
    }
    return null;
};

const del = async (id) => {
    const review = await Review.findByPk(id);
    if (review) {
        await review.destroy();
        return true;
    }
    return false;
};

const delByUserAndProduct = async (userId, productId) => {
    const review = await Review.findOne({ where: { productId: productId, userId: userId } });
    if (review) {
        await review.destroy();
        return true;
    }
    return false;
}; 


module.exports = {get, getByUserAndProduct, getAllByProduct, getAllByUser, add, update, updateByUserAndProduct, del, delByUserAndProduct};