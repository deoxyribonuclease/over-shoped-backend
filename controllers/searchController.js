const searchService = require('../services/searchService');



// test
const Category = require('../models/category');
const User = require('../models/user');
const Shop = require('../models/shop');
const Product = require('../models/product');
const ProductProperty = require('../models/productProperty');

async function setUp() {
    await Category.create({name: 'Телефони'});  
    await Category.create({name: 'Ноутбуки'});  
    await Category.create({name: 'Планшети'});  
    await Category.create({name: 'Комп\'ютери'});  
    await Category.create({name: 'Телевізори'});  
    await Category.create({name: 'Холодильники'});  
    await Category.create({name: 'Унітази'});  
    await Category.create({name: 'Чоловічий одяг'});  
    await Category.create({name: 'Жіночий одяг'});  
    await Category.create({name: 'Спортивне взуття'});  
    await Category.create({name: 'Класичне взуття'});  
    await Category.create({name: 'М\'ясо'});  
    await Category.create({name: 'Риба'});  
    await Category.create({name: 'Хліб та хлібобулочні вироби'});  
    await Category.create({name: 'Овочі та фрукти'}); 

    await User.create({email: 'test@example.com', password: 'testtest'});
    await Shop.create({userId: 1, name: 'testShop', description: 'testdescripti', phoneNumber: '228', email: 'shop@example.com' });

    await Product.create({shopId: 1, name: 'Samsung I69', description: 'Nice phone', price: 14.48, categoryId: 1, rating: 4});

    await ProductProperty.create({categoryId: 1, productId: 1, name: 'Оперативна', content: '16gb'});
    await ProductProperty.create({categoryId: 1, productId: 1, name: 'Діагональ', content: '6.6'});
    await ProductProperty.create({categoryId: 1, productId: 1, name: 'Сімок', content: '2'});
    await ProductProperty.create({categoryId: 1, productId: 1, name: 'Вбудована', content: '256gb'});

    await Product.create({shopId: 1, name: 'AIphone 228', description: 'bad phone', price: 20.48, categoryId: 1, rating: 3});

    await ProductProperty.create({categoryId: 1, productId: 2, name: 'Оперативна', content: '32gb'});
    await ProductProperty.create({categoryId: 1, productId: 2, name: 'Діагональ', content: '6.4'});
    await ProductProperty.create({categoryId: 1, productId: 2, name: 'Сімок', content: '1'});
    await ProductProperty.create({categoryId: 1, productId: 2, name: 'Вбудована', content: '1024gb'});

  };
// test

const getAllCategories = async (req, res) => {
    await setUp();
    try {
        const categories = await searchService.getCategories();
        if (categories) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ error: 'Table is empty' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const getAllProperties = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await searchService.getCategoryProperties(categoryId);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json({error: 'No properties'})
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const getProductsFilters = async (req, res) => {
    const { shopId, categoryId, properties, priceRange, ratingRange } = req.body;
    try {
        const products = await searchService.getProductsByFilters(shopId, categoryId, properties, priceRange, ratingRange);

        if (products && products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: 'No products with such parameters' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

module.exports = { getAllCategories, getAllProperties, getProductsFilters };