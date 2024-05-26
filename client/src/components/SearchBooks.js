import React, { useState } from 'react';
import axios from 'axios';
import './SearchBooks.css'; // Import CSS file for styling

function SearchBooks() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/books/search-books?q=${query}`);
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const addToReadList = async (book) => {
    try {
      // Step 1: Add the book to the database
      const bookResponse = await axios.post('/api/books', {
        name: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', '),
        description: book.volumeInfo.description,
      });

      // Step 2: Get the book ID from the database response
      const bookId = bookResponse.data.id;

      // Step 3: Add the book to the read list in the database
      // await axios.post('/api/read-lists', { userId: 1, bookId });

      console.log('Added to "read" list:', book.volumeInfo.title);
    } catch (error) {
      console.error('Error adding book to "read" list:', error);
    }    console.log('Added to "read" list:');
  };

  const addToToBeReadList = (book) => {
    // Add logic to add the book to the "to be read" list
    console.log('Added to "to be read" list:');
  };

  const writeReview = (book) => {
    // Add logic to navigate to the review page for the selected book
    console.log('Write a review:');
  };

  return (
    <div className="search-books-container">
      <div className="search-books-form">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-books-results">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
            <button onClick={() => addToReadList(book)}>Add to "Read" List</button>
            <button onClick={() => addToToBeReadList(book)}>Add to "To Be Read" List</button>
            <button onClick={() => writeReview(book)}>Write a Review</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBooks;
