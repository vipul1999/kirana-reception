import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import UserReview from './userReview/UserReview'; // Adjust path as per your project structure
import './ShowReviews.css';

const ShowReviews = ({ reviews }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className="shop-reviews">
      {(
        <>
          <div className="pagination-container">
            <Button
              variant="link"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </Button>
            <Button
              variant="link"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </Button>
          </div>
          {currentReviews.length > 0 ? (
            <>
              <h6>Reviews:</h6>
              {currentReviews.map((review, index) => (
                <UserReview key={index} review={review} />
              ))}
            </>
          ) : (
            <p>No reviews to display.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ShowReviews;
