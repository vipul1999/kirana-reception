import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import SubmitReview from '../SubmitReview'; // Adjust path as per your project structure
import ShowReviews from '../ShowReviews'; // Adjust path as per your project structure
import './ShopInfo.css';
import { Link } from 'react-router-dom';

const renderStars = (rating) => {
  const fullStars = '★'.repeat(Math.floor(rating));
  const halfStar = rating % 1 !== 0 ? '☆' : '';
  const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
  return `${fullStars}${halfStar}${emptyStars}`;
};

const ShopInfo = ({ shop }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showSubmitReview, setShowSubmitReview] = useState(false); // State to control showing/hiding review submission form

  const toggleReviews = () => {
    setShowSubmitReview(false);
    setShowReviews(!showReviews);
  };

  const toggleSubmitReview = () => {
    setShowReviews(false);
    setShowSubmitReview(!showSubmitReview);
  };

  const fetchShopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shops`);
      // Handle response.data to update shop information if necessary
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  };

  return (
    <Card.Body>
      <div className="shop-header">
        <div className="shop-image">
          <Link to={`/shop/${shop._id}/inventory`}>
            <img
              src={shop.image || "https://via.placeholder.com/350x350?text=default-shop"}
              alt={shop.name}
              className="shop-img"
            />
          </Link>
        </div>
        <div className="shop-details">
          <h5>{shop.name}</h5>
          <p>Address: {shop.address}</p>
          <p>Contact: {shop.contact}</p>
          <p>Services: {shop.services.join(', ')}</p>
          <p>Rating: {renderStars(shop.rating)} by {shop.reviews.length} Users</p>
          <div className="button-group">
            <Button variant={showSubmitReview ? "secondary" :"primary"} onClick={toggleSubmitReview}>
              Submit Review
            </Button>
            <Button variant= {showReviews ? "secondary" : "primary"} onClick={toggleReviews} className="toggle-reviews">
              Show Reviews
            </Button>
          </div>
        </div>
      </div>
      {showSubmitReview && (
        <SubmitReview shop={shop} fetchShopData={fetchShopData} />
      )}
      {showReviews && (
        <ShowReviews
          reviews={shop.reviews}
          showReviews={showReviews}
          toggleReviews={toggleReviews}
        />
      )}
    </Card.Body>
  );
};

export default ShopInfo;
