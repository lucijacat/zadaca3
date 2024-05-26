import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null);

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

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <h3>Username: {user.username}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Read List:</h3>
          <ul>
            {user.readLists.map((item) => (
              <li key={item.id}>{item.book.name}</li>
            ))}
          </ul>
          <h3>To Be Read List:</h3>
          <ul>
            {user.toBeReadLists.map((item) => (
              <li key={item.id}>{item.book.name}</li>
            ))}
          </ul>
          <h3>Reviews:</h3>
          <ul>
            {user.reviews.map((review) => (
              <li key={review.id}>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
                <p>Book: {review.book.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
