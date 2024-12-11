const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const app = express();
const { ip, port } = require('./config');

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
const categoryRoute = require('./routes/categoryRoutes');
const orderRoute = require('./routes/orderRoutes');

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/reviews', reviewRoute);
app.use('/favorites', favoriteRoute);
app.use('/shops', shopRoute);
app.use('/search', searchRoute);
app.use('/category', categoryRoute);
app.use('/order', orderRoute);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating database tables:', error);
    });

app.get('/', (req, res) => {
    res.send('<h1>Server is running!</h1>');
});

app.listen(port, ip, () => {
    console.log(`Server is running on: ${ip}:${port}`);
});