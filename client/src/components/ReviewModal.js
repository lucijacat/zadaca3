import React, { useState } from 'react';
import axios from 'axios';
import './ReviewModal.css'; 

function ReviewModal({ book, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    const bookResponse = await axios.post('/api/books', {
        name: book.volumeInfo.title,
        author: book.volumeInfo.authors.join(', '),
        description: book.volumeInfo.description,
      });

      const bookId = bookResponse.data.id;


    onSubmit({ bookId, rating, comment });
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <h2>Write a Review</h2>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <div className="button-group">
          <button onClick={handleSubmit}>Submit Review</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
