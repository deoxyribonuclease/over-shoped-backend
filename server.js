const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const app = express();

app.use(cors());

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const productRoute = require('./routes/productRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const favoriteRoute = require('./routes/favoriteRoutes');
const shopRoute = require('./routes/shopRoutes');

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.use('/reviews', reviewRoute);
app.use('/favorites', favoriteRoute);
app.use('/shops', shopRoute);

// remove { force : true } to cancel db flush
sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating database tables:', error);
    });

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Start the server
const { ip, port } = require('./config');
app.listen(port, ip, () => {
    console.log(`Server is running on: ${ip}:${port}`);
});