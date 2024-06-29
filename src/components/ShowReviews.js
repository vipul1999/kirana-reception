import React from 'react';
import { Button } from 'react-bootstrap';
import UserReview from './userReview/UserReview'; // Adjust path as per your project structure
import './ShowReviews.css';

const ShowReviews = ({ reviews, showReviews, toggleReviews }) => (
  <div className="shop-reviews">
    <Button
      variant="link"
      onClick={toggleReviews}
      className="toggle-reviews"
    >
      {showReviews ? 'Hide Reviews' : 'Show Reviews'}
    </Button>
    {showReviews && (
      <>
        <h6>Reviews:</h6>
        {reviews.map((review, index) => (
          <UserReview key={index} review={review} />
        ))}
      </>
    )}
  </div>
);

export default ShowReviews;
