// SubmitReview.js

import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './SubmitReview.css';

const SubmitReview = ({ shop, fetchShopData }) => {
  const initialReviewState = {
    userRating: 0,
    userComment: '',
  };

  const [review, setReview] = useState({ ...initialReviewState });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const submitReview = async () => {
    const reviewData = {
      user: 'Anonymous', // Replace with actual user data or authentication mechanism
      comment: review.userComment,
      rating: review.userRating,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/shops/${shop._id}/rate`, reviewData);
      fetchShopData(); // Refresh shop data after submitting review
      setReview({ ...initialReviewState }); // Reset form values after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="submit-review-container">
      <h3>Submit Your Review</h3>
      <Form>
        <Form.Group as={Row} controlId="userRating">
          <Form.Label column sm={3}>
            Your Rating:
          </Form.Label>
          <Col sm={9}>
            <Form.Control as="select" name="userRating" value={review.userRating} onChange={handleInputChange}>
              {[...Array(6).keys()].slice(1).map((rating) => (
                <option key={rating} value={rating}>
                  {rating} star{rating !== 1 ? 's' : ''}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="userComment">
          <Form.Label column sm={3}>
            Your Comment:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              rows={3}
              name="userComment"
              value={review.userComment}
              onChange={handleInputChange}
              className="form-control"
            />
          </Col>
        </Form.Group>
        <div className="submit-review-button">
          <Button variant="primary" onClick={submitReview}>
            Submit Rating
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SubmitReview;
