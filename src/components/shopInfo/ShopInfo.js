import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import UserReview from '../userReview/UserReview';
import './ShopInfo.css';

const renderStars = (rating) => {
  const fullStars = '★'.repeat(Math.floor(rating));
  const halfStar = rating % 1 !== 0 ? '☆' : '';
  const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
  return `${fullStars}${halfStar}${emptyStars}`;
};

const ShopHeader = ({ shop }) => (
  <div className="shop-header">
    <div className="shop-image">
      <img
        src={shop.image || "https://via.placeholder.com/350x350?text=default-shop"}
        alt={shop.name}
        className="shop-img"
      />
    </div>
    <div className="shop-details">
      <h5>{shop.name}</h5>
      <p>Address: {shop.address}</p>
      <p>Contact: {shop.contact}</p>
      <p>Services: {shop.services.join(', ')}</p>
      <p>Rating: {renderStars(shop.rating)}</p>
    </div>
  </div>
);

const ShopReviews = ({ reviews, showReviews, toggleReviews }) => (
  <div className="shop-reviews">
    <Button variant="link" onClick={toggleReviews} className="toggle-reviews">
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

const ReviewForm = ({ userRating, userComment, handleRatingChange, handleCommentChange, submitReview }) => (
  <div className="shop-actions">
    <Form.Group controlId="userRating">
      <Form.Label>Your Rating:</Form.Label>
      <Form.Control as="select" value={userRating} onChange={handleRatingChange}>
        <option value={0}>Select...</option>
        <option value={1}>1 star</option>
        <option value={2}>2 stars</option>
        <option value={3}>3 stars</option>
        <option value={4}>4 stars</option>
        <option value={5}>5 stars</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="userComment">
      <Form.Label>Your Comment:</Form.Label>
      <Form.Control as="textarea" rows={3} value={userComment} onChange={handleCommentChange} />
    </Form.Group>
    <Button variant="primary" onClick={submitReview}>
      Submit Rating
    </Button>
  </div>
);

const ShopInfo = ({ shop }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const toggleReviews = () => setShowReviews(!showReviews);
  const handleRatingChange = (event) => setUserRating(parseInt(event.target.value));
  const handleCommentChange = (event) => setUserComment(event.target.value);

  const submitReview = async () => {
    const reviewData = {
      user: 'Anonymous',
      comment: userComment,
      rating: userRating,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/shops/${shop._id}/rate`, reviewData);
      setUserRating(0);
      setUserComment('');
      setShowReviews(true);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Card.Body>
      <ShopHeader shop={shop} />
      {shop.reviews.length > 0 && <ShopReviews reviews={shop.reviews} showReviews={showReviews} toggleReviews={toggleReviews} />}
      <ReviewForm
        userRating={userRating}
        userComment={userComment}
        handleRatingChange={handleRatingChange}
        handleCommentChange={handleCommentChange}
        submitReview={submitReview}
      />
    </Card.Body>
  );
};

export default ShopInfo;
