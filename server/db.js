const { Pool } = require('pg');

const pool = new Pool({
  user: 'bookshelf_u7nl_user',
  host: 'dpg-cp9e0adds78s73cgd5m0-a.frankfurt-postgres.render.com',
  database: 'bookshelf_u7nl',
  password: '3xQgDzAgQwOY21vz7CtbZqfW62eLQyP2',
  port: 5432, 
  ssl: {
    rejectUnauthorized: false // Disable SSL certificate validation (for development only)
  }
});

module.exports = pool;
