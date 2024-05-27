import React, { useState } from 'react';
import axios from 'axios';
import ReviewModal from './ReviewModal';
import './SearchBooks.css'; // Import CSS file for styling

function SearchBooks() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);


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
      const bookResponse = await axios.post('/api/books', {
        name: book.volumeInfo.title,
        author: book.volumeInfo.authors.join(', '),
        description: book.volumeInfo.description,
      });

      const bookId = bookResponse.data.id;

      await axios.post('/api/read-lists', { userId: 1, bookId });

      console.log('Added to "read" list:');
      console.log(book.volumeInfo.title);
    } catch (error) {
      console.error('Error adding book to "read" list:', error);
    }
  };

  const addToToBeReadList = async (book) => {
    try {
      const bookResponse = await axios.post('/api/books', {
        name: book.volumeInfo.title,
        author: book.volumeInfo.authors.join(', '),
        description: book.volumeInfo.description,
      });

      const bookId = bookResponse.data.id;

      await axios.post('/api/to-be-read-lists', { userId: 1, bookId });

      console.log('Added to "to be read" list:');
      console.log(book.volumeInfo.title);
    } catch (error) {
      console.error('Error adding book to "to be read" list:', error);
    }
  };

  const handleWriteReview = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      await axios.post('/api/reviews', { userId: 1, bookId: reviewData.bookId, rating: reviewData.rating, comment: reviewData.comment });
      setSelectedBook(null);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="search-books-container">
      <div className="search-books-form">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for books..." />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-books-results">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
            <div className="button-group">
              <button className="add-to-list" onClick={() => addToReadList(book)}>Add to "Read" List</button>
              <button className="add-to-list" onClick={() => addToToBeReadList(book)}>Add to "To Be Read" List</button>
              <button className="write-review" onClick={() => handleWriteReview(book)}>Write a Review</button>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <ReviewModal book={selectedBook} onClose={handleCloseModal} onSubmit={handleSubmitReview} />
      )}
    </div>
  );
}

export default SearchBooks;
