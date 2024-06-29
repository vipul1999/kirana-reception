import React from 'react';
import './UserReview.css'; // Ensure UserReview.css is properly linked for styling

const UserReview = ({ review }) => {
  const avatarUrls = {
    user1: 'https://via.placeholder.com/50?text=User1',
    user2: 'https://via.placeholder.com/50?text=User2',
    user3: 'https://via.placeholder.com/50?text=User3',
    // Add more avatars as needed for different users
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < review.rating ? 'filled' : 'empty'}`}>&#9733;</span>
      );
    }
    return stars;
  };

  return (
    <div className="user-review">
      <div className="user-review-header">
        <img src={avatarUrls[review.user] || 'https://via.placeholder.com/50?text=User1'} alt={`${review.user}'s avatar`} className="avatar" />
        <div className="user-review-details">
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
