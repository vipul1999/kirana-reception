import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './SubmitReview.css';

const SubmitReview = ({ shop, fetchShopData }) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [submitting, setSubmitting] = useState(false); // State to track submission status

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
      setSubmitting(true); // Set submitting state to true while request is being made
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/shops/${shop._id}/rate`, reviewData);
      fetchShopData(); // Refresh shop data after submitting review
      setUserRating(0); // Reset form values after successful submission
      setUserComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false); // Reset submitting state regardless of success or error
    }
  };

  // Function to render stars based on userRating, selecting from left
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <label key={i} className={`star ${userRating >= i ? 'selected' : ''}`} onClick={() => handleRatingChange(i)}>
          &#9733;
        </label>
      );
    }
    return stars;
  };

  return (
    <div className="shop-actions">
      <div className="rating-stars">
        {renderStars()}
      </div>
      <Form.Group controlId="userComment">
        <Form.Label>Your Comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={userComment}
          onChange={handleCommentChange}
          className="form-control"
          disabled={submitting} // Disable textarea while submitting
        />
      </Form.Group>
      <Button variant="primary" onClick={submitReview} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Rating'}
      </Button>
    </div>
  );
};

export default SubmitReview;
