const express = require('express');
const sequelize = require('./db');
const app = express();

const userRoute = require('./routes/userRoutes');

app.use(express.json());

app.use('/users', userRoute);

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