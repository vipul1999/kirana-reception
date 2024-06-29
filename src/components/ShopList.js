import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shops`);
        console.log('API Response:', response); // Log the entire response
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  return (
    <div>
      <h2>Local Shops</h2>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>
            <h3>{shop.name}</h3>
            <p>Address: {shop.address}</p>
            <p>Contact: {shop.contact}</p>
            <p>Services: {shop.services.join(', ')}</p>
            <p>Rating: {shop.rating}</p>
            <p>Reviews:</p>
            <ul>
              {shop.reviews.map((review, index) => (
                <li key={index}>
                  <p>User: {review.user}</p>
                  <p>Comment: {review.comment}</p>
                  <p>Rating: {review.rating}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopList;
