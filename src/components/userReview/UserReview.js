import React from 'react';
import './UserReview.css'; // Import UserReview CSS for styling

const UserReview = ({ review }) => {
  // Sample avatar URLs for demonstration
  const avatarUrls = {
    user1: 'https://via.placeholder.com/50?text=User1',
    user2: 'https://via.placeholder.com/50?text=User2',
    user3: 'https://via.placeholder.com/50?text=User3',
    // Add more avatars as needed for different users
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < review.rating) {
        stars.push(<span key={i} className="star">&#9733;</span>); // Full star
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="user-review">
      <div className="user-review-header">
        <img src= {"https://via.placeholder.com/50?text=User"} alt={`${review.user}'s avatar`} className="avatar" />
        <div>
          <div className="user-review-stars">
            {renderStars()}
          </div>
          <span className="user-review-user">{review.user}</span>
        </div>
      </div>
      <p className="user-review-comment">{review.comment}</p>
    </div>
  );
};

export default UserReview;
