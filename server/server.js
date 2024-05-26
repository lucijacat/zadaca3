const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


// Database connection
const sequelize = new Sequelize('postgres://bookshelf_u7nl_user:3xQgDzAgQwOY21vz7CtbZqfW62eLQyP2@dpg-cp9e0adds78s73cgd5m0-a.frankfurt-postgres.render.com/bookshelf_u7nl', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => {
        console.error('Unable to connect to the database:', err.message);
        console.error('Error stack:', err.stack);
    });

// Routes
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const readListRoutes = require('./routes/reviewRoutes');
const toBeReadListRoutes = require('./routes/toBeReadListRoutes');

// Mount route files
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/read-lists', readListRoutes);
app.use('/api/to-be-read-lists', toBeReadListRoutes);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

