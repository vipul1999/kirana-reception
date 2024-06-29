import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopInfo from './shopInfo/ShopInfo';
import './ShopList.css';

const ShopList = () => {
  const [shops, setShops] = useState([]);

  const fetchShopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shops`);
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  return (
    <div className="shop-list">
      {shops.map(shop => (
        <ShopInfo key={shop._id} shop={shop} fetchShopData={fetchShopData} />
      ))}
    </div>
  );
};

export default ShopList;
