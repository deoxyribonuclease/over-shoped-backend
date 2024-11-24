const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const app = express();
const { ip, port, session_secret } = require('./config');

// app.use(session({
//     secret: session_secret || "Neshtatna situation",
//     resave: false,
//     saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(cors());

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const productRoute = require('./routes/productRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const favoriteRoute = require('./routes/favoriteRoutes');
const shopRoute = require('./routes/shopRoutes');
const searchRoute = require('./routes/searchRoutes');

//const orderRoute = require('./routes/orderRoutes');

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.use('/reviews', reviewRoute);
app.use('/favorites', favoriteRoute);
app.use('/shops', shopRoute);
app.use('/search', searchRoute);

//app.use('/order', orderRoute);

// test TO-DO refactor
const Category = require('./models/category');
const User = require('./models/user');
const Shop = require('./models/shop');
const Product = require('./models/product');
const ProductProperty = require('./models/productProperty');

async function setUp() {
    await Category.create({ name: 'Телефони' });
    await Category.create({ name: 'Ноутбуки' });
    await Category.create({ name: 'Планшети' });
    await Category.create({ name: 'Комп\'ютери' });
    await Category.create({ name: 'Телевізори' });
    await Category.create({ name: 'Холодильники' });
    await Category.create({ name: 'Унітази' });
    await Category.create({ name: 'Чоловічий одяг' });
    await Category.create({ name: 'Жіночий одяг' });
    await Category.create({ name: 'Спортивне взуття' });
    await Category.create({ name: 'Класичне взуття' });
    await Category.create({ name: 'М\'ясо' });
    await Category.create({ name: 'Риба' });
    await Category.create({ name: 'Хліб та хлібобулочні вироби' });
    await Category.create({ name: 'Овочі та фрукти' });

    await User.create({ email: 'test@example.com', password: 'testtest' });
    await Shop.create({ userId: 1, name: 'testShop', description: 'testdescripti', phoneNumber: '228', email: 'shop@example.com' });

    await User.create({ email: 'test1@example.com', password: 'testtest' });
    await Shop.create({ userId: 2, name: 'testShop1', description: 'testdescripti', phoneNumber: '228', email: 'shop@example.com' });


    await Product.create({ shopId: 1, name: 'Samsung I69', description: 'Nice phone', price: 14.48, categoryId: 1, rating: 4 });

    await ProductProperty.create({ categoryId: 1, productId: 1, name: 'Оперативна', content: '16gb' });
    await ProductProperty.create({ categoryId: 1, productId: 1, name: 'Діагональ', content: '6.6' });
    await ProductProperty.create({ categoryId: 1, productId: 1, name: 'Сімок', content: '2' });
    await ProductProperty.create({ categoryId: 1, productId: 1, name: 'Вбудована', content: '256gb' });

    await Product.create({ shopId: 2, name: 'AIphone 228', description: 'bad phone', price: 20.48, categoryId: 1, rating: 3 });

    await ProductProperty.create({ categoryId: 1, productId: 2, name: 'Оперативна', content: '32gb' });
    await ProductProperty.create({ categoryId: 1, productId: 2, name: 'Діагональ', content: '6.4' });
    await ProductProperty.create({ categoryId: 1, productId: 2, name: 'Сімок', content: '1' });
    await ProductProperty.create({ categoryId: 1, productId: 2, name: 'Вбудована', content: '1024gb' });
};
// test
  
// remove { force : true } to cancel db flush
sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
        setUp();
    })
    .catch((error) => {
        console.error('Error creating database tables:', error);
    });

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Start the server
app.listen(port, ip, () => {
    console.log(`Server is running on: ${ip}:${port}`);
});