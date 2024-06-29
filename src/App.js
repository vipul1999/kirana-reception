import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shops`);
        console.log('API Response:', response); // Log the entire response
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Local Shops Listing</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>
            <h2>{shop.name}</h2>
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
}

export default App;
