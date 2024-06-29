import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UserReview from '../userReview/UserReview';
import './ShopInfo.css';


const renderStars = (rating) => {
    const fullStars = '★'.repeat(Math.floor(rating)); // Full stars
    const halfStar = rating % 1 !== 0 ? '☆' : ''; // Half star if rating is not whole
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating)); // Empty stars
  
    return `${fullStars}${halfStar}${emptyStars}`;
  };
  
const ShopInfo = ({ shop }) => {
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
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
      {shop.reviews.length > 0 && (
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
              {shop.reviews.map((review, index) => (
                <UserReview key={index} review={review} />
              ))}
            </>
          )}
        </div>
      )}
    </Card.Body>
  );
};

export default ShopInfo;
