import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'; 

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState('');
  const [updatedRating, setUpdatedRating] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/1`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      setUser((prevUser) => ({
        ...prevUser,
        reviews: prevUser.reviews.filter((review) => review.id !== reviewId),
      }));
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
  };

  const handleUpdateReview = async () => {
    try {
      const response = await axios.put(`/api/reviews/${editingReview.id}`, {
        userid: 1,
        comment: updatedComment,
        rating: updatedRating,
      });
      setUser((prevUser) => ({
        ...prevUser,
        reviews: response.data,
      }));
      setEditingReview(null);
      setUpdatedComment('');
      setUpdatedRating(0);
    } catch (error) {
      console.error('Failed to update review', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setUpdatedComment('');
    setUpdatedRating(0);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h2>User Profile</h2>
      </div>
      {user && (
        <div className="user-details">
          <div className="user-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <div className="user-list-container">
            <div className="user-read-list user-category">
              <h3>Read List:</h3>
              <ul>
                {user.readList && user.readList.map((item) => (
                  <li key={item.id}>
                    <p className="book-name">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="user-to-be-read-list user-category">
              <h3>To Be Read List:</h3>
              <ul>
                {user.toBeReadList && user.toBeReadList.map((item) => (
                  <li key={item.id}>
                    <p className="book-name">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="user-reviews user-category">
              <h3>Reviews:</h3>
              <ul>
                {user.reviews && user.reviews.map((review) => (
                  <li key={review.id}>
                    {editingReview && editingReview.id === review.id ? (
                      <div>
                        <textarea
                          className="review-textarea"
                          value={updatedComment}
                          onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                        <input
                          className="review-input"
                          type="number"
                          value={updatedRating}
                          onChange={(e) => setUpdatedRating(Number(e.target.value))}
                        />
                        <button className="update-button" onClick={handleUpdateReview}>Update</button>
                        <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <p><strong>Book:</strong> {review.name}</p>
                        <p><strong>Comments:</strong> {review.comment}</p>
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <button onClick={() => handleEditReview(review)}>Edit</button>
                        <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
