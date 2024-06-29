import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import SubmitReview from '../SubmitReview'; // Adjust path as per your project structure
import ShowReviews from '../ShowReviews'; // Adjust path as per your project structure
import './ShopInfo.css';

const renderStars = (rating) => {
  const fullStars = '★'.repeat(Math.floor(rating));
  const halfStar = rating % 1 !== 0 ? '☆' : '';
  const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
  return `${fullStars}${halfStar}${emptyStars}`;
};

const ShopInfo = ({ shop }) => {
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
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
      <SubmitReview shop={shop} fetchShopData={fetchShopData} />
      {shop.reviews.length > 0 && (
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
