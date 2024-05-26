const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to the database
(async () => {
    try {
      await db.connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error connecting to database:', error.message);
      process.exit(1); // Exit the process if database connection fails
    }
})();
  
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

