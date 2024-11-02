const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const app = express();

app.use(cors());

app.use(express.json());

const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const productRoute = require('./routes/productRoutes');

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

sequelize.sync()
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});