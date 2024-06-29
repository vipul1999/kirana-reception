import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure bootstrap CSS is imported
import { Container, Row, Col, Card } from 'react-bootstrap';
import ShopInfo from './shopInfo/ShopInfo';
import './ShopList.css'; // Import the ShopList CSS

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shops`);
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Container className="mt-5 shop-list-container">
      <h1 className="text-center mb-4">Local Shops Listing</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {shops.map((shop) => (
          <Col key={shop._id}>
            <Card className="custom-card">
              <ShopInfo shop={shop} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShopList;
