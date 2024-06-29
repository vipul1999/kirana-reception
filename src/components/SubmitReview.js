import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './SubmitReview.css';

const SubmitReview = ({ shop, fetchShopData }) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handleRatingChange = (event) => {
    setUserRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };

  const submitReview = async () => {
    const reviewData = {
      user: 'Anonymous',
      comment: userComment,
      rating: userRating,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/shops/${shop._id}/rate`, reviewData);
      fetchShopData();
      setUserRating(0);
      setUserComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
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
        <Form.Control
          as="textarea"
          rows={3}
          value={userComment}
          onChange={handleCommentChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={submitReview}>
        Submit Rating
      </Button>
    </div>
  );
};

export default SubmitReview;
