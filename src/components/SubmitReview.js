import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './SubmitReview.css';

const SubmitReview = ({ shop, fetchShopData }) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };

  const submitReview = async () => {
    const reviewData = {
      user: 'Anonymous', // Replace with actual user data or authentication mechanism
      comment: userComment,
      rating: userRating,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/shops/${shop._id}/rate`, reviewData);
      fetchShopData(); // Refresh shop data after submitting review
      setUserRating(0); // Reset form values after submission
      setUserComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="shop-actions">
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < userRating ? 'selected' : ''}`}
            onClick={() => handleRatingChange(index + 1)}
          >
            {index < userRating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <Form.Group controlId="userComment">
        <Form.Label>Your Comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={userComment}
          onChange={handleCommentChange}
          className="form-control"
        />
      </Form.Group>
      <div className="submit-btn">
        <button onClick={submitReview}>
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default SubmitReview;
